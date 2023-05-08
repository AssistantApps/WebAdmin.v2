import { Container, Service } from "typedi";
import { AddLicenceViewModel, IApiSearch, ILanguageController, ILicenceController, LicenceViewModel } from "@assistantapps/assistantapps.api.client";

import { AAEndpoints } from "../../../constants/endpoints";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";
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
