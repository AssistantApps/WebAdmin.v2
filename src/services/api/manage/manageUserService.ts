import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { UserViewModel } from "../../../contracts/generated/ViewModel/User/userViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageUserService extends BaseApiService implements BaseCrudService<UserViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: UserViewModel): Promise<Result> {
        throw new Error('ManageUserService: Method not implemented.');
    }

    read(guid: string): Promise<ResultWithValue<UserViewModel>> {
        throw new Error('ManageUserService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<UserViewModel>>> {
        return this.post<Array<UserViewModel>, any>(
            AAEndpoints.user,
            {
                page: search?.page ?? 1,
                searchText: search?.searchText ?? '',
            },
            addAccessTokenToHeaders,
        );
    }

    update(item: UserViewModel): Promise<Result> {
        throw new Error('ManageUserService: Method not implemented.');
    }

    del(item: UserViewModel): Promise<Result> {
        const url = `${AAEndpoints.user}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageUserService = () => Container.get(ManageUserService);
