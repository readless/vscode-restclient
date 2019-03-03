'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { TextDocument } from 'vscode';
import { VariableType } from '../../models/variableType';
import { FileVariableProvider } from './fileVariableProvider';
import { HttpVariableProvider, HttpVariableValue } from './httpVariableProvider';

export class DirVariableProvider implements HttpVariableProvider {
    type: VariableType;
    private static _instance: DirVariableProvider;

    private readonly fileVariableProviders: HttpVariableProvider = FileVariableProvider.Instance;

    public static get Instance(): DirVariableProvider {
        if (!DirVariableProvider._instance) {
            DirVariableProvider._instance = new DirVariableProvider();
        }

        return DirVariableProvider._instance;
    }

    public async has(document: TextDocument, name: string): Promise<boolean> {

        let workSpaceParentDir = path.dirname(vscode.workspace.rootPath);
        let dirName = document.uri.fsPath;
        let loopCount = 0;
        while (true) {
            if (loopCount++ > 15) {
                break;
            }
            dirName = path.dirname(dirName);
            if (dirName === workSpaceParentDir) {
                break;
            }
            let confFileName = dirName + "\\@var.conf";
            if (!fs.existsSync(confFileName)) {
                continue;
            }
            let doc = await vscode.workspace.openTextDocument(confFileName);
            let hasVarDef = await this.fileVariableProviders.has(doc, name, null);
            if (hasVarDef) {
                return true;
            }
        }
        return false;
    }

    public async get(document: TextDocument, name: string): Promise<HttpVariableValue> {
        let workSpaceParentDir = path.dirname(vscode.workspace.rootPath);
        let dirName = document.uri.fsPath;
        let loopCount = 0;
        while (true) {
            if (loopCount++ > 15) {
                break;
            }
            dirName = path.dirname(dirName);
            if (dirName === workSpaceParentDir) {
               break;
            }
            let confFileName = dirName + "\\@var.conf";
            if (!fs.existsSync(confFileName)) {
                continue;
            }
            let doc = await vscode.workspace.openTextDocument(confFileName);
            let hasVarDef = await this.fileVariableProviders.has(doc, name, null);
            if (hasVarDef) {
                return this.fileVariableProviders.get(doc, name, null);
            }
        }

        return null;
    }

    public async getAll(document: TextDocument): Promise<HttpVariableValue[]> {
        let result: HttpVariableValue[] = [];
        let workSpaceParentDir = path.dirname(vscode.workspace.rootPath);
        let dirName = document.uri.fsPath;
        let loopCount = 0;
        while (true) {
            if (loopCount++ > 15) {
                break;
            }
            dirName = path.dirname(dirName);
            if (dirName === workSpaceParentDir) {
                break;
            }
            let confFileName = dirName + "\\@var.conf";
            if (!fs.existsSync(confFileName)) {
                continue;
            }
            let doc = await vscode.workspace.openTextDocument(confFileName);
            let vars = await this.fileVariableProviders.getAll(doc, null);
            vars.map(i => result.push(i));
        }
        return result;
    }
}