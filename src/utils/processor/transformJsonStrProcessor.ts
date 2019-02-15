'use strict';

import { RestClientSettings } from '../../models/configurationSettings';
import {ResponseProcessor} from './responseProcessor';

export class TransformJsonStrProcessor implements ResponseProcessor {

    private static _instance: TransformJsonStrProcessor;

    public static get Instance(): TransformJsonStrProcessor {
        if (!TransformJsonStrProcessor._instance) {
            TransformJsonStrProcessor._instance = new TransformJsonStrProcessor();
        }
        return TransformJsonStrProcessor._instance;
    }
    public process(response: string): string {
        if (RestClientSettings.Instance.expandJsonStrAsJsonObject) {
            return JSON.stringify(this.replaceJsonStrToObject(response));
        } else {
            return response;
        }
    }

    /**
     * 把json内部的json格式的字符串转化成json对象
     * @param strOrObject 字符串或对象
     */
    private replaceJsonStrToObject(strOrObject: any): any {
        try {
            let jsonObj;
            // 如果不是Object，则先转成Object
            if (typeof strOrObject !== 'object') {
                jsonObj = JSON.parse(strOrObject);
                if (typeof jsonObj !== 'object') {
                    return strOrObject;
                }
            } else {
                jsonObj  = strOrObject;
            }

            for (const key in jsonObj) {
                jsonObj[key] = this.replaceJsonStrToObject(jsonObj[key]);
            }
            return jsonObj;
        } catch (e) {
            return strOrObject;
        }
    }
}
