import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { TranslationImageViewModel } from "../../../contracts/generated/ViewModel/Translation/translationImageViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, formDataWithAccessTokenHeaders } from "./baseCrudService";

@Service()
export class ManageTranslationImageService extends BaseApiService {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    add(guid: string, formData: any): Promise<Result> {
        return this.post<any, Array<TranslationImageViewModel>>(
            `${AAEndpoints.translationImage}/${guid}`,
            formData,
            formDataWithAccessTokenHeaders,
        );
    }

    readAll(guid: string): Promise<ResultWithValue<Array<TranslationImageViewModel>>> {
        return this.get<Array<TranslationImageViewModel>>(
            `${AAEndpoints.translationImage}/${guid}`,
            addAccessTokenToHeaders,
        );
    }

    del(item: TranslationImageViewModel): Promise<Result> {
        const url = `${AAEndpoints.translationImage}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageTranslationImageService = () => Container.get(ManageTranslationImageService);
