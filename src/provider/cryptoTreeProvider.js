const vscode = require('vscode');
const finnhub = require('../data/finnhub')
const { CryptoItem } = require('../models/treeItem')
const { CONFIG, CONTEXT } = require('../constants')

class CryptoTreeDataProvider {
    
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.searchText = '';
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    async getChildren(element) {
        if (!element) {
            let exchange = vscode.workspace.getConfiguration().get(CONFIG.EXCHANGE);
            return finnhub.getCryptoSymbols({ exchange: exchange }).then(rst => {
                return rst.filter(symbol => {
                    return symbol.description.toLowerCase().indexOf(this.searchText.toLowerCase()) > 0
                        || symbol.displaySymbol.toLowerCase().indexOf(this.searchText.toLowerCase()) > 0
                        || symbol.symbol.toLowerCase().indexOf(this.searchText.toLowerCase()) > 0
                        || this.searchText == ''
                })
                .sort((a, b) => a.displaySymbol.localeCompare(b.displaySymbol))
                .map(symbol => new CryptoItem({ 
                    description: symbol.description,
                    displaySymbol: symbol.displaySymbol,
                    symbol: symbol.symbol
                }))
            })
        }
    }
}

module.exports = {
    CryptoTreeDataProvider
}