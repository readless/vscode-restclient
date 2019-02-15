'use strict';

import { logTime } from '../logTimeCostDecorator';
import {ResponseProcessor} from './responseProcessor';
import {TransformDateProcessor} from './transformDateProcessor';
import { TransformJsonStrProcessor } from './transformJsonStrProcessor';

export class ResponseProcessors {

    private static readonly processors: ResponseProcessor[] = [
        TransformDateProcessor.Instance,
        TransformJsonStrProcessor.Instance
    ];

    @logTime("ResponseProcess")
    public static process(response: string): string {
        for (const processor of ResponseProcessors.processors) {
            response = processor.process(response);
        }
        return response;
    }

}
