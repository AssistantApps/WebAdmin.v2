import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { DataWithExpiry } from "../../../contracts/dataWithExpiry";
import { AppViewModel } from "../../../contracts/generated/ViewModel/appViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { addSeconds, isBefore } from "../../../helper/dateHelper";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageAppsService extends BaseApiService implements BaseCrudService<AppViewModel> {
    private _getAppsCache?: DataWithExpiry<Array<AppViewModel>>;

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: AppViewModel): Promise<Result> {
        return this.post<any, AppViewModel>(
            AAEndpoints.app, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<AppViewModel>> {
        throw new Error('AppManageService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<AppViewModel>>> {
        const apiResult = await this.get<Array<AppViewModel>>(
            `${AAEndpoints.app}/Admin`,
            addAccessTokenToHeaders,
        );

        if (apiResult.isSuccess) {
            this._getAppsCache = {
                expiredAfter: addSeconds(new Date(), 1000),
                value: apiResult.value,
            }
        }

        return apiResult;
    }

    async readAllCached(search?: IApiSearch): Promise<ResultWithValue<Array<AppViewModel>>> {
        if (this._getAppsCache != null && isBefore(new Date(), this._getAppsCache.expiredAfter)) {
            return {
                isSuccess: true,
                value: this._getAppsCache.value,
                errorMessage: '',
            }
        }

        return await this.readAll(search);
    }

    update(item: AppViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.app, item,
            addAccessTokenToHeaders
        );
    }

    del(item: AppViewModel): Promise<Result> {
        const url = `${AAEndpoints.app}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageAppsService = () => Container.get(ManageAppsService);
