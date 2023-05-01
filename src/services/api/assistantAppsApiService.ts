import { AssistantAppsApiService as aaApi, IUserLogin, OAuthUserViewModel } from '@assistantapps/assistantapps.api.client';
import { Container, Service } from "typedi";

import { Result } from "../../contracts/resultWithValue";
import { IState } from "../store/initialState";
import { getStateService, StateService } from "../store/stateService";
import { getConfig } from '../internal/configService';

@Service()
export class AuthedAssistantAppsApiService {
    private _state: StateService;
    private _api: aaApi;

    constructor() {
        this._state = getStateService();
        this._api = new aaApi({
            url: getConfig().getAssistantAppsUrl(),
            authToken: getStateService().getState().auth.token,
        });
    }

    getDashboard = () => this._api.dashboard.dashboard();
    getDashboardForAdmin = () => this._api.dashboard.adminDashboard();

    getUserActivity = () => this._api.userActivity.readAll();

    getAuthedApi = () => this._api;

    async loginWithGoogleAuth(userVm: OAuthUserViewModel): Promise<Result> {
        const isSuccess: any = await this._api.account.loginWithGoogleAuth(
            userVm,
            (userAcc: IUserLogin) => {
                this._state.setState((state: IState) => {
                    state.auth.userGuid = userAcc.userGuid;
                    state.auth.username = userVm.username;
                    state.auth.profilePic = userVm.profileUrl;
                    state.auth.token = userAcc.token;
                    state.auth.tokenExpiry = userAcc.tokenExpiry as any;
                    state.auth.tokenExpiryDate = userAcc.tokenExpiryDate;
                });

                this._api = new aaApi({
                    url: getConfig().getAssistantAppsUrl(),
                    authToken: userAcc.token,
                })
            },
        );

        return {
            isSuccess,
            errorMessage: '',
        };
    }
}

export const getAssistantAppsApi = () => Container.get(AuthedAssistantAppsApiService);
