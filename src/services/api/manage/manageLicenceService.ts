import { Container, Service } from "typedi";
import { AddLicenceViewModel, IApiSearch, ILicenceController, LicenceViewModel } from "@assistantapps/assistantapps.api.client";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { BaseCrudService } from "./baseCrudService";
import { getAssistantAppsApi } from "../assistantAppsApiService";

@Service()
export class ManageLicenceService implements BaseCrudService<LicenceViewModel> {
    private _controller: () => ILicenceController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().licence;
    }

    create(item: LicenceViewModel): Promise<Result> {
        const payload: AddLicenceViewModel = {
            guid: item.guid,
            appGuid: item.appGuid,
            name: item.name,
        };
        return this._controller().create(payload);
    }

    read(guid: string): Promise<ResultWithValue<LicenceViewModel>> {
        throw new Error('ManageLicenceService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<LicenceViewModel>>> {
        return this._controller().readAll();
    }

    update(item: LicenceViewModel): Promise<Result> {
        throw new Error('ManageLicenceService: Method not implemented.');
    }

    del(item: LicenceViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageLicenceService = () => Container.get(ManageLicenceService);
