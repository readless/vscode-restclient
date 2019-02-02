'use strict';
import * as vscode from 'vscode';
import {OutputChannel} from 'vscode';

export class Logger  {
    private static _instance: Logger;
    private outputChannel: OutputChannel;

    public static get Instance(): Logger {
        if (!this._instance) {
            this._instance = new Logger();
        }
        return this._instance;
    }

    public log(msg: string) {
        this.outputChannel.appendLine(msg);
    }

    public constructor() {
        this.outputChannel = vscode.window.createOutputChannel("rest-client");
        this.outputChannel.show();
    }
}