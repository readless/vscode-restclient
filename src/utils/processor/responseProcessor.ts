'use strict';

export interface ResponseProcessor {
    process(responseHtmlBody: string): string;
}
