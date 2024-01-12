import { IApiSearch, ITranslationKeyController, TranslationKeyViewModel } from "@assistantapps/assistantapps.api.client";
import { Container, Service } from "typedi";

import { DataWithExpiry } from "../../../contracts/dataWithExpiry";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { addSeconds, isBefore } from "../../../helper/dateHelper";
import { getAssistantAppsApi } from "../assistantAppsApiService";
import { BaseCrudService } from "./baseCrudService";
import { getManageTranslationImageService } from "./manageTranslationImageService";

@Service()
export class ManageTranslationKeysService implements BaseCrudService<TranslationKeyViewModel> {
    private _getTransKeysCache?: DataWithExpiry<Array<TranslationKeyViewModel>>;
    private _controller: () => ITranslationKeyController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().translationKey;
    }

    async create(item: TranslationKeyViewModel): Promise<Result> {
        const { translationKeyImages, ...transKeyObj } = (item as any);

        const createResponse = await this._controller().create(transKeyObj);

        if (createResponse.isSuccess == false) {
            return createResponse;
        }

        const translationImageServ = getManageTranslationImageService();
        for (const translationKeyImage of (translationKeyImages ?? [])) {
            await translationImageServ.add(
                createResponse.value,
                translationKeyImage.name ?? 'unknown',
                translationKeyImage.contents,
            );
        }

        return createResponse;
    }

    read(guid: string): Promise<ResultWithValue<TranslationKeyViewModel>> {
        throw new Error('ManageTranslationKeysService: Method not implemented.');
    }

    async readAll(search?: IApiSearch): Promise<ResultWithValue<Array<TranslationKeyViewModel>>> {
        const apiResult = await this._controller().readAll();

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

    async update(item: TranslationKeyViewModel): Promise<Result> {
        const { translationKeyImages, ...transKeyObj } = (item as any);

        const updateResponse = await this._controller().update(transKeyObj);

        if (updateResponse.isSuccess == false) {
            return updateResponse;
        }

        const translationImageServ = getManageTranslationImageService();
        for (const translationKeyImage of (translationKeyImages ?? [])) {
            await translationImageServ.add(
                transKeyObj.guid,
                translationKeyImage.name ?? 'unknown',
                translationKeyImage.contents,
            );
        }

        return updateResponse;
    }

    del(item: TranslationKeyViewModel): Promise<Result> {
        return this._controller().del(item.guid);
    }
}

export const getManageTranslationKeysService = () => Container.get(ManageTranslationKeysService);
