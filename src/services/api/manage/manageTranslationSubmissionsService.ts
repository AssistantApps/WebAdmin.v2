import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { TranslationSubmittedDetailViewModel } from "../../../contracts/generated/ViewModel/Translation/translationSubmittedDetailViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { anyObject } from "../../../helper/typescriptHacks";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageTranslationSubmissionsService extends BaseApiService implements BaseCrudService<TranslationSubmittedDetailViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: TranslationSubmittedDetailViewModel): Promise<Result> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }

    read(guid: string): Promise<ResultWithValue<TranslationSubmittedDetailViewModel>> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationSubmittedDetailViewModel>>> {
        return this.post<any, TranslationSubmittedDetailViewModel>(
            AAEndpoints.translationSearch,
            search ?? anyObject,
            addAccessTokenToHeaders,
        );
    }

    update(item: TranslationSubmittedDetailViewModel): Promise<Result> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }

    del(item: TranslationSubmittedDetailViewModel): Promise<Result> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }
}

export const getManageTranslationSubmissionsService = () => Container.get(ManageTranslationSubmissionsService);
