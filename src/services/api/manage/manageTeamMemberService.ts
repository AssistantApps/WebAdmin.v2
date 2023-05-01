import { Container, Service } from "typedi";

import { IApiSearch, ITeamMemberController, TeamMemberViewModel } from "@assistantapps/assistantapps.api.client";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageTeamMemberService implements BaseCrudService<TeamMemberViewModel> {
    private _controller: () => ITeamMemberController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().teamMember;
    }

    create(item: TeamMemberViewModel): Promise<Result> {
        return this._controller().create(item);
    }

    read(guid: string): Promise<ResultWithValue<TeamMemberViewModel>> {
        throw new Error('ManageTeamMemberService: Method not implemented.');
    }

    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TeamMemberViewModel>>> {
        return this._controller().readAll();
    }

    update(item: TeamMemberViewModel): Promise<Result> {
        return this._controller().update(item);
    }

    del(item: TeamMemberViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageTeamMemberService = () => Container.get(ManageTeamMemberService);
