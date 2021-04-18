const finnhub = require('finnhub');
const utils = require('../utils/utils');
 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = utils.getApiKey('finnhub');
const finnhubClient = new finnhub.DefaultApi()

module.exports = {
    // Crypto candles
    async getCryptoCandles({ symbol, resolution, from, to }) {
        return await new Promise((resolve, reject) => {
            finnhubClient.cryptoCandles(symbol, resolution, from, to, (error, data, response) => {
                if (!error) {
                    console.log(data)
                    resolve(data)    
                } else {
                    reject (error)
                }
            });
        })
        
    },
    // Crypto exchanges
    async getCryptoExchanges() {
        return await new Promise((resolve, reject) => {
            finnhubClient.cryptoExchanges((error, data, response) => {
                if (!error) {
                    console.log(data)
                    resolve(data)
                } else {
                    reject(error)
                }
            });
        });
    },
    //Crypto symbols
    async getCryptoSymbols({ exchange }) {
        return await new Promise((resolve, reject) => {
            finnhubClient.cryptoSymbols(exchange, (error, data, response) => {
                if (!error) {
                    console.log(data)
                    resolve(data)    
                } else {
                    reject (error)
                }
            });
        })
    }    
}