import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { AppNoticeViewModel } from "../../../contracts/generated/ViewModel/appNoticeViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageAppNoticeService extends BaseApiService implements BaseCrudService<AppNoticeViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: AppNoticeViewModel): Promise<Result> {
        return this.post<any, AppNoticeViewModel>(
            AAEndpoints.appNotice, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<AppNoticeViewModel>> {
        throw new Error('AppManageService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<AppNoticeViewModel>>> {
        return this.get<Array<AppNoticeViewModel>>(
            `${AAEndpoints.appNotice}/Admin`,
            addAccessTokenToHeaders,
        );
    }

    update(item: AppNoticeViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.appNotice, item,
            addAccessTokenToHeaders
        );
    }

    del(item: AppNoticeViewModel): Promise<Result> {
        const url = `${AAEndpoints.appNotice}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageAppNoticeService = () => Container.get(ManageAppNoticeService);
