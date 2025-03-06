const axios = require('axios');

exports.handler = async (event, context) => {
  // Set security headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Frame-Options': 'SAMEORIGIN'
  };

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: 'Method Not Allowed' 
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { message, page } = data;

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Message is required' })
      };
    }

    // Telegram Bot configuration
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      console.error('Telegram configuration missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Server configuration error' })
      };
    }

    // Format the message text
    const messageText = `New chat message from website:\n\nPage: ${page || 'Unknown'}\n\nMessage: ${message}`;

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    
    console.log(`Sending message to Telegram: ${messageText}`);
    console.log(`Using URL: ${telegramUrl}`);
    console.log(`Chat ID: ${telegramChatId}`);
    
    const response = await axios.post(telegramUrl, {
      chat_id: telegramChatId,
      text: messageText,
      parse_mode: 'HTML'
    });
    
    console.log('Telegram API response:', response.data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Message sent to Telegram' })
    };
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to send message', error: error.message })
    };
  }
}; 