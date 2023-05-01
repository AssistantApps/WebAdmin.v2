import { IPermissionController, PermissionType } from "@assistantapps/assistantapps.api.client";
import { Container, Service } from "typedi";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";

@Service()
export class ManagePermissionsService {
    private _controller: () => IPermissionController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().permission;
    }

    getCurrentUsersPermissions(): Promise<ResultWithValue<Array<PermissionType>>> {
        return this._controller().readCurrentUsersPermissions();
    }

    getPermissionsForUserGuid(userGuid: string): Promise<ResultWithValue<Array<PermissionType>>> {
        return this._controller().readPermissionsForUserGuid(userGuid);
    }

    addForUser(guid: string, permissionType: PermissionType): Promise<Result> {
        return this._controller().addForUser(guid, permissionType);
    }

    delPermissionForUser(guid: string, permissionType: PermissionType): Promise<Result> {
        return this._controller().delPermissionForUser(guid, permissionType);
    }
}

export const getManagePermissionsService = () => Container.get(ManagePermissionsService);
