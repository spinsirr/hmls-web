import { AnthropicModelProvider, createZypherAgent } from "@corespeed/zypher";
import { SYSTEM_PROMPT } from "./system-prompt.ts";
import { calcomTools } from "./tools/calcom.ts";
import { customerTools } from "./tools/customer.ts";
import { stripeTools } from "./tools/stripe.ts";

export async function createHmlsAgent() {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  const agent = await createZypherAgent({
    modelProvider: new AnthropicModelProvider({
      apiKey,
    }),
    systemPrompt: SYSTEM_PROMPT,
    tools: [...calcomTools, ...customerTools, ...stripeTools],
  });

  return agent;
}

export function runAgentTask(
  agent: Awaited<ReturnType<typeof createHmlsAgent>>,
  message: string,
) {
  return agent.runTask(message, "claude-sonnet-4-20250514");
}
