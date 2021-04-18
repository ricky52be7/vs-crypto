const vscode = require('vscode')
const { CryptoChartPanel } = require('../provider/cryptoChartPanel')
const { CONTEXT, CMD } = require('../constants');

module.exports = {
    showChart(cryptoItem) {
        let panel = new CryptoChartPanel({
            displaySymbol: cryptoItem.displaySymbol,
            symbol: cryptoItem.symbol,
            description: cryptoItem.symbolDescription
        });
        panel.createAndShow();
    },
    search() {
        new Promise(async (resolve) => {
            let searchText = await vscode.window.showInputBox()
            resolve(searchText);
        }).then(searchText => {
            vscode.commands.executeCommand('setContext', CONTEXT.SEARCH_TEXT, searchText);
            vscode.commands.executeCommand(CMD.UPDATE_TREE_VIEW, searchText)
        });        
    },
    clear() {
        vscode.commands.executeCommand('setContext', CONTEXT.SEARCH_TEXT, '');
        vscode.commands.executeCommand(CMD.UPDATE_TREE_VIEW, '')
    }
}