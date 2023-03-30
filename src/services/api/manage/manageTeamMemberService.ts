import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { TeamMemberViewModel } from "../../../contracts/generated/ViewModel/teamMemberViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageTeamMemberService extends BaseApiService implements BaseCrudService<TeamMemberViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    create(item: TeamMemberViewModel): Promise<Result> {
        return this.post<any, TeamMemberViewModel>(
            AAEndpoints.teamMember, item,
            addAccessTokenToHeaders,
        );
    }

    read(guid: string): Promise<ResultWithValue<TeamMemberViewModel>> {
        throw new Error('ManageTeamMemberService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TeamMemberViewModel>>> {
        return this.get<Array<TeamMemberViewModel>>(
            AAEndpoints.teamMember,
            addAccessTokenToHeaders,
        );
    }

    update(item: TeamMemberViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.teamMember, item,
            addAccessTokenToHeaders
        );
    }

    del(item: TeamMemberViewModel): Promise<Result> {
        const url = `${AAEndpoints.teamMember}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageTeamMemberService = () => Container.get(ManageTeamMemberService);
