import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import { eachValueFrom } from "npm:rxjs-for-await";
import { createHmlsAgent, runAgentTask } from "../agent/index.ts";
import { db, schema } from "../db/client.ts";
import { eq } from "drizzle-orm";

const task = new Hono();

// Store agent instance
let agentInstance: Awaited<ReturnType<typeof createHmlsAgent>> | null = null;

async function getAgent() {
  if (!agentInstance) {
    agentInstance = await createHmlsAgent();
  }
  return agentInstance;
}

// WebSocket upgrade handler
task.get("/", async (c) => {
  const upgrade = c.req.header("upgrade");

  if (upgrade?.toLowerCase() !== "websocket") {
    return c.json({ error: "WebSocket upgrade required" }, 426);
  }

  const { socket, response } = Deno.upgradeWebSocket(c.req.raw);

  let conversationId: number | null = null;

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = async (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        const { message, conversationId: convId } = data;

        // Create or get conversation
        if (!conversationId && !convId) {
          const [conv] = await db
            .insert(schema.conversations)
            .values({ channel: "web" })
            .returning();
          conversationId = conv.id;
        } else if (convId) {
          conversationId = convId;
        }

        // Store user message
        await db.insert(schema.messages).values({
          conversationId: conversationId!,
          role: "user",
          content: message,
        });

        // Send conversation ID back
        socket.send(JSON.stringify({
          type: "conversation",
          conversationId,
        }));

        // Get agent and run task
        const agent = await getAgent();
        const taskEvents = runAgentTask(agent, message);

        let fullResponse = "";

        for await (const event of eachValueFrom(taskEvents)) {
          if (event.type === "text_delta") {
            fullResponse += event.text;
            socket.send(JSON.stringify({
              type: "delta",
              text: event.text,
            }));
          } else if (event.type === "tool_use") {
            socket.send(JSON.stringify({
              type: "tool_start",
              name: event.name,
            }));
          } else if (event.type === "tool_result") {
            socket.send(JSON.stringify({
              type: "tool_end",
              name: event.name,
            }));
          }
        }

        // Store assistant response
        if (fullResponse) {
          await db.insert(schema.messages).values({
            conversationId: conversationId!,
            role: "assistant",
            content: fullResponse,
          });
        }

        socket.send(JSON.stringify({
          type: "done",
        }));
      }
    } catch (error) {
      console.error("WebSocket error:", error);
      socket.send(JSON.stringify({
        type: "error",
        message: "An error occurred while processing your request",
      }));
    }
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return response;
});

// Get conversation history (REST endpoint)
task.get("/history/:conversationId", async (c) => {
  const conversationId = Number(c.req.param("conversationId"));

  const messages = await db
    .select()
    .from(schema.messages)
    .where(eq(schema.messages.conversationId, conversationId))
    .orderBy(schema.messages.createdAt);

  return c.json({ messages });
});

export default task;
