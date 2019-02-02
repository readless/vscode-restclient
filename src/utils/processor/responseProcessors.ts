'use strict';

import {ResponseProcessor} from './responseProcessor';
import {TransformDateProcessor} from './transformDateProcessor';

export class ResponseProcessors {

    private static readonly processors: [ResponseProcessor] = [
        TransformDateProcessor.Instance
    ];

    public static process(responseHtmlBody: string): string {

        for (const processor of ResponseProcessors.processors) {
            responseHtmlBody = processor.process(responseHtmlBody);
        }

        return responseHtmlBody;
    }

}
