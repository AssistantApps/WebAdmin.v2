import { Container, Service } from "typedi";

import { IApiSearch, ILanguageController, LanguageViewModel } from "@assistantapps/assistantapps.api.client";
import { DataWithExpiry } from "../../../contracts/dataWithExpiry";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { addSeconds, isBefore } from "../../../helper/dateHelper";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageLanguageService implements BaseCrudService<LanguageViewModel> {
    private _getLanguagesCache?: DataWithExpiry<Array<LanguageViewModel>>;
    private _controller: () => ILanguageController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().language;
    }

    create(item: LanguageViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<LanguageViewModel>> {
        throw new Error('ManageLanguageService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<LanguageViewModel>>> {
        const apiResult = await this._controller().readAll();

        if (apiResult.isSuccess) {
            this._getLanguagesCache = {
                expiredAfter: addSeconds(new Date(), 1000),
                value: apiResult.value,
            }
        }

        return apiResult;
    }

    async readAllCached(search?: IApiSearch): Promise<ResultWithValue<Array<LanguageViewModel>>> {
        if (this._getLanguagesCache != null && isBefore(new Date(), this._getLanguagesCache.expiredAfter)) {
            return {
                isSuccess: true,
                value: this._getLanguagesCache.value,
                errorMessage: '',
            }
        }

        return await this.readAll(search);
    }

    update(item: LanguageViewModel): Promise<Result> {
        return this._controller().update(item);
    }

    del(item: LanguageViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageLanguageService = () => Container.get(ManageLanguageService);
