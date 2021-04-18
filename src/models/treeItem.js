const vscode = require('vscode');
const { CMD } = require('../constants')

class CryptoItem extends vscode.TreeItem {
    constructor({ description, displaySymbol, symbol }, collapsibleState) {
        super(displaySymbol, collapsibleState);
        this.contextValue = "CryptoItem";
        this.command = {
            command: CMD.SHOW_CHART,
            title: '',
            arguments: [this]
        };
        this.symbolDescription = description;
        this.displaySymbol = displaySymbol;
        this.symbol = symbol;
    }
}

module.exports = {
    CryptoItem
}
