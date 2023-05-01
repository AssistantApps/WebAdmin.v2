import { Container, Service } from "typedi";

import { AppViewModel, IApiSearch, IAppController } from "@assistantapps/assistantapps.api.client";
import { DataWithExpiry } from "../../../contracts/dataWithExpiry";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { addSeconds, isBefore } from "../../../helper/dateHelper";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageAppsService implements BaseCrudService<AppViewModel> {
    private _getAppsCache?: DataWithExpiry<Array<AppViewModel>>;
    private _controller: () => IAppController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().app;
    }

    create(item: AppViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<AppViewModel>> {
        throw new Error('AppManageService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<AppViewModel>>> {
        const apiResult = await this._controller().readAllForAdmin(search);

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
        return this._controller().update(item);
    }

    del(item: AppViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageAppsService = () => Container.get(ManageAppsService);
