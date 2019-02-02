'use strict';

export function trace(eventName: string): MethodDecorator {
    return (target, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        let originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}