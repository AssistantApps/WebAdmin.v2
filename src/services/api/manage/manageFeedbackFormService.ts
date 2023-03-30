import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { FeedbackFormViewModel } from "../../../contracts/generated/ViewModel/FeedbackForm/feedbackFormViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageFeedbackFormService extends BaseApiService implements BaseCrudService<FeedbackFormViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: FeedbackFormViewModel): Promise<Result> {
        return this.post<any, FeedbackFormViewModel>(
            AAEndpoints.feedbackForm, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<FeedbackFormViewModel>> {
        throw new Error('ManageFeedbackFormService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<FeedbackFormViewModel>>> {
        return this.get<Array<FeedbackFormViewModel>>(
            `${AAEndpoints.feedbackForm}/Admin`,
            addAccessTokenToHeaders,
        );
    }

    update(item: FeedbackFormViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.feedbackForm, item,
            addAccessTokenToHeaders
        );
    }

    del(item: FeedbackFormViewModel): Promise<Result> {
        const url = `${AAEndpoints.feedbackForm}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageFeedbackFormService = () => Container.get(ManageFeedbackFormService);
