import { FeedbackFormQuestionViewModel, IApiSearch, IFeedbackFormQuestionController } from "@assistantapps/assistantapps.api.client";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

export class ManageFeedbackFormQuestionService implements BaseCrudService<FeedbackFormQuestionViewModel> {
    private _feedbackFormGuid: string;
    private _controller: () => IFeedbackFormQuestionController;

    constructor(feedbackFormGuid: string) {
        this._feedbackFormGuid = feedbackFormGuid;
        this._controller = () => getAssistantAppsApi().getAuthedApi().feedbackFormQuestion;
    }

    create(item: FeedbackFormQuestionViewModel): Promise<Result> {
        return this._controller().create({
            ...item,
            feedbackFormGuid: this._feedbackFormGuid,
        });
    }

    read(guid: string): Promise<ResultWithValue<FeedbackFormQuestionViewModel>> {
        throw new Error('ManageFeedbackFormQuestionService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<FeedbackFormQuestionViewModel>>> {
        return this._controller().readForFeedback(this._feedbackFormGuid);
    }

    update(item: FeedbackFormQuestionViewModel): Promise<Result> {
        return this._controller().update({
            ...item,
            feedbackFormGuid: this._feedbackFormGuid,
        });
    }

    del(item: FeedbackFormQuestionViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}


