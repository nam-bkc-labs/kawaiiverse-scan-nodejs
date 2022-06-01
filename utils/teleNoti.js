const axios = require('axios');

module.exports = {
    sendError: async (content) => {
        try {
            await axios.get("https://api.telegram.org/bot5345932864:AAHo7Vjp02sJxkJYyHpCURJ2NcoNuXLVk2U/sendMessage?chat_id=-681710789&text=" + encodeURIComponent(content));


        } catch (e) {

        }
    },
};
