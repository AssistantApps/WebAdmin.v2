import { FeedbackFormAdminAnswerViewModel, IApiSearch, IFeedbackFormAnswerController } from "@assistantapps/assistantapps.api.client";

import { ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";

export class ManageFeedbackFormAnswerService {
    private _feedbackFormGuid: string;
    private _controller: () => IFeedbackFormAnswerController;

    constructor(feedbackFormGuid: string) {
        this._controller = () => getAssistantAppsApi().getAuthedApi().feedbackFormAnswer;
        this._feedbackFormGuid = feedbackFormGuid;
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<FeedbackFormAdminAnswerViewModel>>> {
        return this._controller().readForFeedback(this._feedbackFormGuid);
    }
}


