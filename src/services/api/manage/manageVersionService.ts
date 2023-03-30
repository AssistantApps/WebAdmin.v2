import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { VersionViewModel } from "../../../contracts/generated/ViewModel/Version/versionViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageVersionService extends BaseApiService implements BaseCrudService<VersionViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: VersionViewModel): Promise<Result> {
        return this.post<any, VersionViewModel>(
            AAEndpoints.version, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<VersionViewModel>> {
        throw new Error('ManageVersionService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<VersionViewModel>>> {
        return this.get<Array<VersionViewModel>>(
            `${AAEndpoints.version}/Admin`,
            addAccessTokenToHeaders,
        );
    }

    update(item: VersionViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.version, item,
            addAccessTokenToHeaders
        );
    }

    del(item: VersionViewModel): Promise<Result> {
        const url = `${AAEndpoints.version}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageVersionService = () => Container.get(ManageVersionService);
