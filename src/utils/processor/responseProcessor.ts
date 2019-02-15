'use strict';

export interface ResponseProcessor {
    process(response: string): string;
}
