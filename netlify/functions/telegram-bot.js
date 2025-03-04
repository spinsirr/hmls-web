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
    const { message } = data;

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

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    await axios.post(telegramUrl, {
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'HTML'
    });

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