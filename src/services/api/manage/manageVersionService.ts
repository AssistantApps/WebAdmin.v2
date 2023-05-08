import { IApiSearch, IVersionController, VersionViewModel } from "@assistantapps/assistantapps.api.client";
import { Container, Service } from "typedi";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageVersionService implements BaseCrudService<VersionViewModel> {
    private _controller: () => IVersionController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().version;
    }

    create(item: VersionViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<VersionViewModel>> {
        throw new Error('ManageVersionService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<VersionViewModel>>> {
        return this._controller().readAllForAdmin();
    }

    update(item: VersionViewModel): Promise<Result> {
        return this._controller().update(item);
    }

    del(item: VersionViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageVersionService = () => Container.get(ManageVersionService);
