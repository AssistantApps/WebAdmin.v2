import { Container, Service } from "typedi";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { BaseCrudService } from "./baseCrudService";
import { AppType, IApiSearch, ISteamController } from "@assistantapps/assistantapps.api.client";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { ISteamBranchRow } from "@assistantapps/assistantapps.api.client";

@Service()
export class ManageSteamBranchService implements BaseCrudService<ISteamBranchRow> {
    private _appTypes = [AppType.nms, AppType.sms];
    private _controller: () => ISteamController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().steam;
    }

    create(item: ISteamBranchRow): Promise<Result> {
        throw new Error('ManageSteamBranchService: Method not implemented.');
    }

    read(appType: string): Promise<ResultWithValue<ISteamBranchRow>> {
        return this._controller().readBranch(appType);
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<ISteamBranchRow>>> {
        const result: Array<ISteamBranchRow> = [];

        for (const appType of this._appTypes) {
            const localBranch = await this.read(appType.toString());
            if (localBranch.isSuccess) {
                result.push(localBranch.value);
            }
        }

        return {
            isSuccess: true,
            value: result,
            errorMessage: '',
        };
    }

    update(item: ISteamBranchRow): Promise<Result> {
        const jsonArr = JSON.parse((item as any).branchesSTRING);
        return this._controller().updateBranch(item.appType.toString(), jsonArr);
    }

    del(item: ISteamBranchRow): Promise<Result> {
        throw new Error('ManageSteamBranchService: Method not implemented.');
    }
}

export const getManageSteamBranchService = () => Container.get(ManageSteamBranchService);
