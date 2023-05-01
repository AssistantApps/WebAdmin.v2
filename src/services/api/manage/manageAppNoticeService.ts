import { Container, Service } from "typedi";

import { AppNoticeViewModel, IApiSearch, IAppNoticeController } from "@assistantapps/assistantapps.api.client";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageAppNoticeService implements BaseCrudService<AppNoticeViewModel> {
    private _controller: () => IAppNoticeController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().appNotice;
    }

    create(item: AppNoticeViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<AppNoticeViewModel>> {
        throw new Error('AppManageService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<AppNoticeViewModel>>> {
        return this._controller().readAllForAdmin();
    }

    update(item: AppNoticeViewModel): Promise<Result> {
        return this._controller().update(item);
    }

    del(item: AppNoticeViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageAppNoticeService = () => Container.get(ManageAppNoticeService);
