import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { LicenceViewModel } from "../../../contracts/generated/ViewModel/Licence/licenceViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageLicenceService extends BaseApiService implements BaseCrudService<LicenceViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: LicenceViewModel): Promise<Result> {
        const payload: any = {
            guid: item.guid,
            appGuid: item.appGuid,
            name: item.name,
        };
        return this.post<any, LicenceViewModel>(
            AAEndpoints.licence,
            payload,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<LicenceViewModel>> {
        throw new Error('ManageLicenceService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<LicenceViewModel>>> {
        return this.get<Array<LicenceViewModel>>(
            AAEndpoints.licence,
            addAccessTokenToHeaders,
        );
    }

    update(item: LicenceViewModel): Promise<Result> {
        throw new Error('ManageLicenceService: Method not implemented.');
    }

    del(item: LicenceViewModel): Promise<Result> {
        const url = `${AAEndpoints.licence}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageLicenceService = () => Container.get(ManageLicenceService);
