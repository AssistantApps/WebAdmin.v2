import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { IApiSearch } from "../../../contracts/apiObjects";
import { DataWithExpiry } from "../../../contracts/dataWithExpiry";
import { TranslationKeyViewModel } from "../../../contracts/generated/ViewModel/Translation/translationKeyViewModel";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { addSeconds, isBefore } from "../../../helper/dateHelper";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders, BaseCrudService } from "./baseCrudService";
import { getManageTranslationImageService } from "./manageTranslationImageService";

@Service()
export class ManageTranslationKeysService extends BaseApiService implements BaseCrudService<TranslationKeyViewModel> {
    private _getTransKeysCache?: DataWithExpiry<Array<TranslationKeyViewModel>>;

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    async create(item: TranslationKeyViewModel): Promise<Result> {
        const { translationKeyImages, ...transKeyObj } = (item as any);

        const createResponse = await this.post<any, TranslationKeyViewModel>(
            AAEndpoints.translationKey,
            transKeyObj,
            addAccessTokenToHeaders,
        );

        if (createResponse.isSuccess == false) {
            return createResponse;
        }

        const translationImageServ = getManageTranslationImageService();
        for (const translationKeyImage of (translationKeyImages ?? [])) {
            await translationImageServ.add(
                createResponse.value,
                translationKeyImage.contents,
            );
        }

        return createResponse;
    }

    read(guid: string): Promise<ResultWithValue<TranslationKeyViewModel>> {
        throw new Error('ManageTranslationKeysService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationKeyViewModel>>> {
        const apiResult = await this.get<Array<TranslationKeyViewModel>>(
            `${AAEndpoints.translationKey}/Admin`,
            addAccessTokenToHeaders,
        );

        if (apiResult.isSuccess) {
            this._getTransKeysCache = {
                expiredAfter: addSeconds(new Date(), 1000),
                value: apiResult.value,
            }
        }

        return apiResult;
    }

    async readAllCached(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationKeyViewModel>>> {
        if (this._getTransKeysCache != null && isBefore(new Date(), this._getTransKeysCache.expiredAfter)) {
            return {
                isSuccess: true,
                value: this._getTransKeysCache.value,
                errorMessage: '',
            }
        }

        return await this.readAll(search);
    }

    update(item: TranslationKeyViewModel): Promise<Result> {
        return this.put(
            AAEndpoints.translationKey, item,
            addAccessTokenToHeaders
        );
    }

    del(item: TranslationKeyViewModel): Promise<Result> {
        const url = `${AAEndpoints.translationKey}/${item.guid}`;
        return this.delete(url, addAccessTokenToHeaders);
    }
}

export const getManageTranslationKeysService = () => Container.get(ManageTranslationKeysService);
