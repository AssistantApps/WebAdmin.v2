import { IApiSearch, IUserController, UserViewModel } from "@assistantapps/assistantapps.api.client";
import { Container, Service } from "typedi";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageUserService implements BaseCrudService<UserViewModel> {
    private _controller: () => IUserController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().user;
    }

    create(item: UserViewModel): Promise<Result> {
        throw new Error('ManageUserService: Method not implemented.');
    }

    read(guid: string): Promise<ResultWithValue<UserViewModel>> {
        throw new Error('ManageUserService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<UserViewModel>>> {
        return this._controller().readAllAdmin({
            page: search?.page ?? 1,
            searchText: search?.searchText ?? '',
        });
    }

    update(item: UserViewModel): Promise<Result> {
        throw new Error('ManageUserService: Method not implemented.');
    }

    del(item: UserViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageUserService = () => Container.get(ManageUserService);
