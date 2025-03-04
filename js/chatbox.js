// Chatbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbox elements
    const chatboxContainer = document.createElement('div');
    chatboxContainer.id = 'chatbox-container';
    chatboxContainer.className = 'chatbox-container';
    
    // Chat toggle button
    const chatToggle = document.createElement('button');
    chatToggle.id = 'chat-toggle';
    chatToggle.className = 'chat-toggle btn-gradient-emerald-blue-emerald-green';
    chatToggle.innerHTML = '<i class="feather icon-feather-message-circle"></i>';
    
    // Chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chat-window';
    chatWindow.className = 'chat-window';
    chatWindow.style.display = 'none';
    
    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.innerHTML = `
        <h4>HMLS Mobile Mechanic</h4>
        <button id="chat-close" class="chat-close"><i class="feather icon-feather-x"></i></button>
    `;
    
    // Chat messages
    const chatMessages = document.createElement('div');
    chatMessages.className = 'chat-messages';
    chatMessages.innerHTML = `
        <div class="message received">
            <p>Hello! How can we help you with your vehicle today? Please include your vehicle's year, make, model, and your phone number so we can better assist you.</p>
        </div>
    `;
    
    // Chat input
    const chatInput = document.createElement('div');
    chatInput.className = 'chat-input';
    chatInput.innerHTML = `
        <input type="text" id="chat-message-input" placeholder="Type your message...">
        <button id="chat-send" class="btn-gradient-emerald-blue-emerald-green">
            <i class="feather icon-feather-send"></i>
        </button>
    `;
    
    // Assemble the chatbox
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatMessages);
    chatWindow.appendChild(chatInput);
    
    chatboxContainer.appendChild(chatToggle);
    chatboxContainer.appendChild(chatWindow);
    
    // Add to the document
    document.body.appendChild(chatboxContainer);
    
    // Event listeners
    chatToggle.addEventListener('click', function() {
        chatWindow.style.display = 'flex';
        chatToggle.style.display = 'none';
    });
    
    document.getElementById('chat-close').addEventListener('click', function() {
        chatWindow.style.display = 'none';
        chatToggle.style.display = 'flex';
    });
    
    document.getElementById('chat-send').addEventListener('click', sendMessage);
    document.getElementById('chat-message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const input = document.getElementById('chat-message-input');
        const message = input.value.trim();
        
        if (message) {
            // Add user message to chat window
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            input.value = '';
            
            // Auto scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Send message to Telegram
            sendToTelegram(message);
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message received typing-indicator';
            typingIndicator.innerHTML = '<p>Typing...</p>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate response after a short delay
            setTimeout(function() {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Add response message
                const responseMessage = document.createElement('div');
                responseMessage.className = 'message received';
                responseMessage.innerHTML = `
                    <p>Thanks for your message. Our team will get back to you shortly. 
                    If you haven't already, please provide your vehicle's year, make, model, and your phone number.
                    For immediate assistance, please call us at (949) 393-8319.</p>
                `;
                chatMessages.appendChild(responseMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 2000);
        }
    }
    
    function sendToTelegram(message) {
        // Get the current page URL
        const pageUrl = window.location.href;
        
        // Send to Telegram via Netlify function
        fetch('/.netlify/functions/telegram-bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                page: pageUrl
            }),
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
        });
    }
}); 