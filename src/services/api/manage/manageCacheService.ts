import { Container, Service } from "typedi";

import { AAEndpoints } from "../../../constants/endpoints";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getConfig } from "../../internal/configService";
import { BaseApiService } from '../baseApiService';
import { addAccessTokenToHeaders } from "./baseCrudService";

@Service()
export class ManageCacheService extends BaseApiService {

    constructor() {
        const config = getConfig();
        super(config.getAssistantAppsUrl());
    }

    getInMemoryCacheItems(): Promise<ResultWithValue<Array<string>>> {
        return this.get<Array<string>>(
            AAEndpoints.cache,
            addAccessTokenToHeaders,
        );
    }

    delInMemoryCacheItem(cacheKey: string): Promise<Result> {
        return this.delete(
            `${AAEndpoints.cache}/${cacheKey}`,
            addAccessTokenToHeaders
        );
    }

    getRedisCacheItems(): Promise<ResultWithValue<Array<string>>> {
        return this.get<Array<string>>(
            AAEndpoints.redisCache,
            addAccessTokenToHeaders,
        );
    }

    delRedisCacheItem(cacheKey: string): Promise<Result> {
        return this.delete(
            `${AAEndpoints.redisCache}/${cacheKey}`,
            addAccessTokenToHeaders
        );
    }
}

export const getManageCacheService = () => Container.get(ManageCacheService);
