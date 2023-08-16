import { Container, Service } from "typedi";
import { ITranslationImageController, TranslationImageViewModel } from "@assistantapps/assistantapps.api.client";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";

@Service()
export class ManageTranslationImageService {
    private _controller: () => ITranslationImageController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().translationImage;
    }

    add(guid: string, fileName: any, data: any): Promise<Result> {
        return this._controller().add(guid, fileName, data);
    }

    readAll(guid: string): Promise<ResultWithValue<Array<TranslationImageViewModel>>> {
        return this._controller().readAll(guid);
    }

    del(item: TranslationImageViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageTranslationImageService = () => Container.get(ManageTranslationImageService);
