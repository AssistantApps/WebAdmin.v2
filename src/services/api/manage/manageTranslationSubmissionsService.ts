import { IApiSearch, ITranslationController, TranslationSubmittedDetailViewModel } from "@assistantapps/assistantapps.api.client";
import { Container, Service } from "typedi";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { anyObject } from "../../../helper/typescriptHacks";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageTranslationSubmissionsService implements BaseCrudService<TranslationSubmittedDetailViewModel> {
    private _controller: () => ITranslationController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().translation;
    }

    create(item: TranslationSubmittedDetailViewModel): Promise<Result> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }

    read(guid: string): Promise<ResultWithValue<TranslationSubmittedDetailViewModel>> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationSubmittedDetailViewModel>>> {
        return this._controller().createSearch(search ?? anyObject);
    }

    update(item: TranslationSubmittedDetailViewModel): Promise<Result> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }

    del(item: TranslationSubmittedDetailViewModel): Promise<Result> {
        throw new Error('ManageTranslationSubmissionsService: Method not implemented.');
    }
}

export const getManageTranslationSubmissionsService = () => Container.get(ManageTranslationSubmissionsService);
