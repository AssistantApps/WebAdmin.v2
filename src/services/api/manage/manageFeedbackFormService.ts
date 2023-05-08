import { FeedbackFormViewModel, IApiSearch, IFeedbackFormController } from "@assistantapps/assistantapps.api.client";
import { Container, Service } from "typedi";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageFeedbackFormService implements BaseCrudService<FeedbackFormViewModel> {
    private _controller: () => IFeedbackFormController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().feedbackForm;
    }

    create(item: FeedbackFormViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<FeedbackFormViewModel>> {
        throw new Error('ManageFeedbackFormService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<FeedbackFormViewModel>>> {
        return this._controller().readAllForAdmin();
    }

    update(item: FeedbackFormViewModel): Promise<Result> {
        return this._controller().update(item);
    }

    del(item: FeedbackFormViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageFeedbackFormService = () => Container.get(ManageFeedbackFormService);
