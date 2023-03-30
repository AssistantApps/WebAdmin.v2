import { Container, Service } from "typedi";
import { AAEndpoints } from "../../../constants/endpoints";
import { PermissionType } from "../../../contracts/generated/Enum/permissionType";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { anyObject } from "../../../helper/typescriptHacks";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders } from "./baseCrudService";

@Service()
export class ManagePermissionsService extends BaseApiService {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    getCurrentUsersPermissions(): Promise<ResultWithValue<Array<PermissionType>>> {
        return this.get<Array<PermissionType>>(
            AAEndpoints.permission,
            addAccessTokenToHeaders,
        );
    }

    getPermissionsForUserGuid(userGuid: string): Promise<ResultWithValue<Array<PermissionType>>> {
        return this.get<Array<PermissionType>>(
            `${AAEndpoints.permission}/${userGuid}`,
            addAccessTokenToHeaders,
        );
    }

    addForUser(guid: string, permissionType: PermissionType): Promise<Result> {
        return this.post<any, any>(
            `${AAEndpoints.permission}/${guid}/${permissionType}`,
            anyObject,
            addAccessTokenToHeaders,
        );
    }

    delPermissionForUser(guid: string, permissionType: PermissionType): Promise<Result> {
        return this.delete(
            `${AAEndpoints.permission}/${guid}/${permissionType}`,
            addAccessTokenToHeaders
        );
    }
}

export const getManagePermissionsService = () => Container.get(ManagePermissionsService);
