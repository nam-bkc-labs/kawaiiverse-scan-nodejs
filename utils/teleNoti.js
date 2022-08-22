const axios = require('axios');
const config = require('../config/config');

module.exports = {
  sendError: async (content) => {
    try {
      await axios.get(`https://api.telegram.org/bot${config.telegram.botToken}/sendMessage?chat_id=${config.telegram.chatId}&text=${encodeURIComponent(content)}`);
    } catch (e) {
    }
  },
};
