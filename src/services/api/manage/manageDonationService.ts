import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { DonationViewModel } from "../../../contracts/generated/ViewModel/donationViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageDonationService extends BaseApiService implements BaseCrudService<DonationViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: DonationViewModel): Promise<Result> {
        return this.post<any, DonationViewModel>(
            AAEndpoints.donation, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<DonationViewModel>> {
        throw new Error('ManageDonationService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<DonationViewModel>>> {
        return this.post<Array<DonationViewModel>, any>(
            `${AAEndpoints.donation}/Search`,
            {
                page: search?.page ?? 1,
                searchText: search?.searchText ?? '',
            },
            addAccessTokenToHeaders,
        );
    }

    update(item: DonationViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.donation, item,
            addAccessTokenToHeaders
        );
    }

    del(item: DonationViewModel): Promise<Result> {
        const url = `${AAEndpoints.donation}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageDonationService = () => Container.get(ManageDonationService);
