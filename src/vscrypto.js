const vscode = require('vscode');
const { CryptoTreeDataProvider } = require('./provider/cryptoTreeProvider');
const cmdUtils = require('./utils/cmdUtils');
const { CMD, View, SCHEME, CONTEXT } = require('./constants')
const { CryptoContentProvider } = require('./provider/cryptoContentProvider')


class VSCrypto {
    constructor(context) {
        console.log("Creating VS Crypto");

        this.context = context;

        const cryptoTreeDataProvider = new CryptoTreeDataProvider();
        this.viewer = vscode.window.createTreeView(View.VS_CRYPTO_VIEW, {
            treeDataProvider: cryptoTreeDataProvider
        });
        vscode.commands.registerCommand(CMD.UPDATE_TREE_VIEW, (searchText) => {
            cryptoTreeDataProvider.searchText = searchText
            cryptoTreeDataProvider.refresh()
        })

        vscode.commands.executeCommand('setContext', CONTEXT.SEARCH_TEXT, '');

        vscode.commands.registerCommand(CMD.SHOW_CHART, cmdUtils.showChart);
        vscode.commands.registerCommand(CMD.SEARCH, cmdUtils.search);
        vscode.commands.registerCommand(CMD.CLEAR, cmdUtils.clear)
        // vscode.workspace.registerTextDocumentContentProvider(SCHEME.VS_CRYPTO, new CryptoContentProvider);
    }
}

module.exports = VSCrypto