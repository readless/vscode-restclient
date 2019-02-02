'use strict';

import { logTime } from '../logTimeCostDecorator';
import {ResponseProcessor} from './responseProcessor';
import {TransformDateProcessor} from './transformDateProcessor';

export class ResponseProcessors {

    private static readonly processors: [ResponseProcessor] = [
        TransformDateProcessor.Instance
    ];

    @logTime("ResponseProcess")
    public static process(responseHtmlBody: string): string {
        for (const processor of ResponseProcessors.processors) {
            responseHtmlBody = processor.process(responseHtmlBody);
        }
        return responseHtmlBody;
    }

}
