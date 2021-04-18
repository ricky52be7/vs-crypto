const apiKey = require('../../apikey.json');

module.exports = {
    getApiKey(lib) {
        return apiKey[lib] || "";
    }
}