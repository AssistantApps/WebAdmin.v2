import { Container, Service } from "typedi";

import { DonationViewModel, IApiSearch, IDonationController } from "@assistantapps/assistantapps.api.client";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageDonationService implements BaseCrudService<DonationViewModel> {
    private _controller: () => IDonationController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().donation;
    }

    create(item: DonationViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<DonationViewModel>> {
        throw new Error('ManageDonationService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<DonationViewModel>>> {
        return this._controller().readAllForAdmin(search);
    }

    update(item: DonationViewModel): Promise<Result> {
        return this._controller().update(item);
    }

    del(item: DonationViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageDonationService = () => Container.get(ManageDonationService);
