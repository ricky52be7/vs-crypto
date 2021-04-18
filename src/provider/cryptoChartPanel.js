const finnhub = require('../data/finnhub');
const vscode = require('vscode');
const { View, CONFIG } = require('../constants');

class CryptoChartPanel {
    constructor({ description, displaySymbol, symbol }) {
        this.displaySymbol = displaySymbol
        this.description = description
        this.symbol = symbol
    }

    createAndShow() {
        let to = Math.floor(Date.now() / 1000);
        let from = to - 24 * 60 * 60
        finnhub.getCryptoCandles({
            symbol: this.symbol,
            resolution: '60',
            from: from,
            to: to
        }).then(rst => {
            if (rst.s != 'ok') {
                vscode.window.showErrorMessage('No Data')
                return
            }

            this.panel = vscode.window.createWebviewPanel(
                View.VS_CRYPTO_WEBVIEW, // Identifies the type of the webview. Used internally
                this.displaySymbol, // Title of the panel displayed to the user
                vscode.ViewColumn.One, // Editor column to show the new webview panel in.
                {
                    enableScripts: true
                }
            );
            
            // format rst
            let data = [];
            for (let i = 0; i < rst.t.length; i++) {
                data.push([rst.t[i] * 1000, rst.o[i], rst.h[i], rst.l[i], rst.c[i]]);
            }

            let bgColor = vscode.workspace.getConfiguration().get(CONFIG.CHART_BACKGROUND_COLOR) || "#ffffff";

            let html = this.getHtml(this.displaySymbol, data, bgColor).replace(/\n/g, "");
            this.panel.webview.html = html;
        })
    }
    
    updateContent() {
        
    }

    dispose() {
        if (this.panel) this.panel.dispose();
    }

    getHtml(symbol, rst, bgColor) {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <script src="https://code.highcharts.com/stock/highstock.js"></script>
            </head>
            <body>
                <div id="container" style="height: 400px; min-width: 310px"></div>
            </body>
            <script>
            let data = ${JSON.stringify(rst)};
            Highcharts.stockChart('container', {


                title: {
                    text: '${symbol}'
                },

                chart: {
                    backgroundColor: '${bgColor}'
                },
        
                rangeSelector: {
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1D'
                    }, {
                        type: 'all',
                        count: 1,
                        text: 'All'
                    }],
                    selected: 1,
                    inputEnabled: false
                },
        
                series: [{
                    name: '${symbol}',
                    type: 'candlestick',
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
            </script>
        </html>
        `
    }
}

module.exports = {
    CryptoChartPanel    
}