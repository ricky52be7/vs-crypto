const vscode = require('vscode')

class CryptoContentProvider {
    constructor() {
        this.onDidChangeEmitter = new vscode.EventEmitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }

    async provideTextDocumentContent(uri, token) {
        return ""
    }
}

module.exports = {
    CryptoContentProvider
}