import { PermissionType } from "../../../contracts/generated/Enum/permissionType";
import { StateService } from "../stateService";

export interface IAuthState {
    userGuid?: string;
    username?: string;
    profilePic?: string;
    token?: string;
    tokenExpiry?: number;
    tokenExpiryDate?: Date;
    permissions: Array<PermissionType>;
}

export const getAuthUsername = (stateService: StateService): [state: () => string | undefined, setState: (state: string) => void] => [
    () => stateService.getState().auth.username,
    (username: string) => stateService.setState(s => s.auth.username = username),
];

export const getAuthToken = (stateService: StateService): [state: () => string | undefined, setState: (state: string) => void] => [
    () => stateService.getState().auth.token,
    (token: string) => stateService.setState(s => s.auth.token = token),
];

export const getAuthTokenExpire = (stateService: StateService): [state: () => Date | undefined, setState: (state: Date) => void] => [
    () => stateService.getState().auth.tokenExpiryDate,
    (tokenExpiryDate: Date) => stateService.setState(s => s.auth.tokenExpiryDate = tokenExpiryDate),
];

export const getUserPermissions = (stateService: StateService): [state: () => Array<PermissionType>, setState: (state: Array<PermissionType>) => void] => [
    () => stateService.getState().auth.permissions,
    (permissions: Array<PermissionType>) => stateService.setState(s => s.auth.permissions = permissions),
];