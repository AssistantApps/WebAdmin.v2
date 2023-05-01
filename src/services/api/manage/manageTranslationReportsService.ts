import { Container, Service } from "typedi";
import { IApiSearch, ITranslationReportController, TranslationReportViewModel } from "@assistantapps/assistantapps.api.client";

import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";

@Service()
export class ManageTranslationReportService implements BaseCrudService<TranslationReportViewModel> {
    private _controller: () => ITranslationReportController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().translationReport;
    }

    async create(item: TranslationReportViewModel): Promise<Result> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    read(guid: string): Promise<ResultWithValue<TranslationReportViewModel>> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationReportViewModel>>> {
        return this._controller().readAll();
    }

    update(item: TranslationReportViewModel): Promise<Result> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    del(item: TranslationReportViewModel): Promise<Result> {
        throw new Error('ManageTranslationReportService: Method not implemented.');
    }

    markAsResolved(guid: string): Promise<Result> {
        return this._controller().resolve(guid);
    }

    markAsClosed(guid: string): Promise<Result> {
        return this._controller().close(guid);
    }
}

export const getManageTranslationReportService = () => Container.get(ManageTranslationReportService);
