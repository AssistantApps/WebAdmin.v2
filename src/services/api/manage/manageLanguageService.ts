import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { DataWithExpiry } from "../../../contracts/dataWithExpiry";
import { LanguageViewModel } from "../../../contracts/generated/ViewModel/languageViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { addSeconds, isBefore } from "../../../helper/dateHelper";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageLanguageService extends BaseApiService implements BaseCrudService<LanguageViewModel> {
    private _getLanguagesCache?: DataWithExpiry<Array<LanguageViewModel>>;

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: LanguageViewModel): Promise<Result> {
        return this.post<any, LanguageViewModel>(
            AAEndpoints.language, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<LanguageViewModel>> {
        throw new Error('ManageLanguageService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<LanguageViewModel>>> {
        const apiResult = await this.get<Array<LanguageViewModel>>(
            AAEndpoints.language,
            addAccessTokenToHeaders,
        );

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
        return this.put(
            AAEndpoints.language, item,
            addAccessTokenToHeaders
        );
    }

    del(item: LanguageViewModel): Promise<Result> {
        const url = `${AAEndpoints.language}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageLanguageService = () => Container.get(ManageLanguageService);
