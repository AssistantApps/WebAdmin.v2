import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { FeedbackFormQuestionViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormQuestionViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

export class ManageFeedbackFormQuestionService extends BaseApiService implements BaseCrudService<FeedbackFormQuestionViewModel> {
    private _feedbackFormGuid: string;

    constructor(feedbackFormGuid: string) {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
        this._feedbackFormGuid = feedbackFormGuid;
    }

    create(item: FeedbackFormQuestionViewModel): Promise<Result> {
        return this.post<any, FeedbackFormQuestionViewModel>(
            AAEndpoints.feedbackFormQuestion,
            {
                ...item,
                feedbackFormGuid: this._feedbackFormGuid,
            },
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<FeedbackFormQuestionViewModel>> {
        throw new Error('ManageFeedbackFormQuestionService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<FeedbackFormQuestionViewModel>>> {
        return this.get<Array<FeedbackFormQuestionViewModel>>(
            `${AAEndpoints.feedbackFormQuestion}/${this._feedbackFormGuid}`,
            addAccessTokenToHeaders,
        );
    }

    update(item: FeedbackFormQuestionViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.feedbackFormQuestion,
            {
                ...item,
                feedbackFormGuid: this._feedbackFormGuid,
            },
            addAccessTokenToHeaders
        );
    }

    del(item: FeedbackFormQuestionViewModel): Promise<Result> {
        const url = `${AAEndpoints.feedbackFormQuestion}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}


