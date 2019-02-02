'use strict';
import {Logger} from './logger';

export function logTime(funcName: string): MethodDecorator {
    return (target, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        let originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            let start = new Date().getTime();
            let ret = originalMethod.apply(this, args);
            let end = new Date().getTime();
            Logger.Instance.log(funcName + " cost: " + (end - start) + " ms");
            return ret;
        };

        return descriptor;
    };
}