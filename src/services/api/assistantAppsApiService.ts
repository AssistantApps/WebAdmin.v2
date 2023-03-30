import { Container, Service } from "typedi";

import { AAEndpoints } from "../../constants/endpoints";
import { TokenExpiryHeaderKey, TokenHeaderKey, UserGuidHeaderKey } from '../../constants/header-keys';
import { DashboardItemViewModel } from "../../contracts/generated/ViewModel/dashboardItemViewModel";
import { OAuthUserViewModel } from "../../contracts/generated/ViewModel/oAuthUserViewModel";
import { UserActivityViewModel } from "../../contracts/generated/ViewModel/User/userActivityViewModel";
import { Result } from "../../contracts/resultWithValue";
import { addSeconds } from "../../helper/dateHelper";
import { anyObject } from "../../helper/typescriptHacks";
import { getConfig } from "../internal/configService";
import { IState } from "../store/initialState";
import { getStateService, StateService } from "../store/stateService";
import { BaseApiService } from './baseApiService';
import { addAccessTokenToHeaders } from "./manage/baseCrudService";

@Service()
export class AssistantAppsApiService extends BaseApiService {
    private _state: StateService;

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
        this._state = getStateService();
    }

    getDashboard = () => this.get<Array<DashboardItemViewModel>>(AAEndpoints.dashboard);
    getDashboardForAdmin = () => this.get<Array<DashboardItemViewModel>>(
        AAEndpoints.adminDashboard,
        addAccessTokenToHeaders,
    );

    getUserActivity = () => this.get<Array<UserActivityViewModel>>(
        AAEndpoints.userActivity,
        addAccessTokenToHeaders,
    );

    // async getWhatIsNewItems(search: VersionSearchViewModel): Promise<ResultWithValueAndPagination<Array<VersionViewModel>>> {
    //     const result = await this.post<Array<VersionViewModel>, VersionSearchViewModel>(
    //         'Version/Search', search,
    //         (response: any) => {
    //             return {
    //                 ...response.data,
    //                 isSuccess: true,
    //                 errorMessage: '',
    //             };
    //         });

    //     return result as ResultWithValueAndPagination<Array<VersionViewModel>>;
    // }

    // async getDonators(page: number): Promise<ResultWithValueAndPagination<Array<DonationViewModel>>> {
    //     const apiResult: any = await this.get<Array<DonationViewModel>>(`Donation?page=${page}`);
    //     return apiResult.value;
    // }

    async loginWithGoogleAuth(userVm: OAuthUserViewModel): Promise<Result> {
        const isSuccess: any = await this.post<any, OAuthUserViewModel>(
            AAEndpoints.authUrl,
            userVm,
            () => anyObject,
            (response: any) => {
                const token = response.headers.get(TokenHeaderKey);
                const tokenExpiry = response.headers.get(TokenExpiryHeaderKey);
                const userGuid = response.headers.get(UserGuidHeaderKey);

                this._state.setState((state: IState) => {
                    state.auth.userGuid = userGuid;
                    state.auth.username = userVm.username;
                    state.auth.profilePic = userVm.profileUrl;
                    state.auth.token = token;
                    state.auth.tokenExpiry = tokenExpiry;
                    state.auth.tokenExpiryDate = addSeconds(new Date(), tokenExpiry);
                });

                return response.status == 200;
            },
        );

        return {
            isSuccess,
            errorMessage: '',
        };
    }
}

export const getAssistantAppsApi = () => Container.get(AssistantAppsApiService);
