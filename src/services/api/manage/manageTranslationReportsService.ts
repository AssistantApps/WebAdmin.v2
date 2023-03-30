import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { TranslationReportViewModel } from "../../../contracts/generated/ViewModel/Translation/translationReportViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { anyObject } from "../../../helper/typescriptHacks";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";

@Service()
export class ManageTranslationReportService extends BaseApiService implements BaseCrudService<TranslationReportViewModel> {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    async create(item: TranslationReportViewModel): Promise<Result> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    read(guid: string): Promise<ResultWithValue<TranslationReportViewModel>> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationReportViewModel>>> {
        return this.get<Array<TranslationReportViewModel>>(
            AAEndpoints.translationReport,
            addAccessTokenToHeaders,
        );
    }

    update(item: TranslationReportViewModel): Promise<Result> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    del(item: TranslationReportViewModel): Promise<Result> {
        const url = `${AAEndpoints.translationReport}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }

    markAsResolved(guid: string): Promise<Result> {
        return this.put(`${AAEndpoints.translationReport}/${guid}`, anyObject);
    }

    markAsClosed(guid: string): Promise<Result> {
        return this.delete(`${AAEndpoints.translationReport}/${guid}`);
    }
}

export const getManageTranslationReportService = () => Container.get(ManageTranslationReportService);
