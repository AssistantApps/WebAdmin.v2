import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { AppType } from "../../../contracts/generated/Enum/appType";
import { SteamBranchItemViewModel } from "../../../contracts/generated/ViewModel/Steam/steamBranchItemViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

export interface ISteamBranchRow {
    appType: AppType;
    branches: Array<SteamBranchItemViewModel>;
}

@Service()
export class ManageSteamBranchService extends BaseApiService implements BaseCrudService<ISteamBranchRow> {

    private _appTypes = [AppType.nms, AppType.sms];

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: ISteamBranchRow): Promise<Result> {
        throw new Error('ManageSteamBranchService: Method not implemented.');
    }

    async read(appType: string): Promise<ResultWithValue<ISteamBranchRow>> {
        const branchesResult = await this.get<Array<SteamBranchItemViewModel>>(
            `${AAEndpoints.steamBranches}/${appType}`,
            addAccessTokenToHeaders,
        );
        return {
            ...branchesResult,
            value: {
                appType: AppType[appType as any] as any,
                branches: branchesResult.value,
            }
        }
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
        return this.post(
            `${AAEndpoints.steamBranches}/${item.appType}`,
            { NewData: jsonArr },
            addAccessTokenToHeaders
        );
    }

    del(item: ISteamBranchRow): Promise<Result> {
        throw new Error('ManageSteamBranchService: Method not implemented.');
    }
}

export const getManageSteamBranchService = () => Container.get(ManageSteamBranchService);
