'use strict';

import {ResponseProcessor} from './responseProcessor';

import moment = require('moment');

export class TransformDateProcessor implements ResponseProcessor {

    private static _instance: TransformDateProcessor;

    private dateRegExp: RegExp = /\/Date\(\d{13}\+0800\)\//g;

    public static get Instance(): TransformDateProcessor {
        if (!TransformDateProcessor._instance) {
            TransformDateProcessor._instance = new TransformDateProcessor();
        }
        return TransformDateProcessor._instance;
    }
    public process(response: string): string {
        return response.replace(this.dateRegExp, function (str) {
             return moment(Number(str.substr(6, 13))).format("YYYY-MM-DD HH:mm:ss.SSS");
        });
    }
}
