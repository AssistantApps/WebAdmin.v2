import { Container, Service } from "typedi";

import { ICacheController, RedisCacheType } from "@assistantapps/assistantapps.api.client";
import { Result, ResultWithValue } from "../../../contracts/resultWithValue";
import { getAssistantAppsApi } from "../assistantAppsApiService";

@Service()
export class ManageCacheService {
    private _controller: () => ICacheController;

    constructor() {
        this._controller = () => getAssistantAppsApi().getAuthedApi().cache;
    }

    getInMemoryCacheItems(): Promise<ResultWithValue<Array<string>>> {
        return this._controller().readAllCache();
    }

    delInMemoryCacheItem(cacheKey: string): Promise<Result> {
        return this._controller().delCache(cacheKey);
    }

    getRedisCacheItems(): Promise<ResultWithValue<Array<string>>> {
        return this._controller().readAllRedisCache();
    }

    delRedisCacheItem(cacheKey: RedisCacheType): Promise<Result> {
        return this._controller().delRedisCache(cacheKey);
    }
}

export const getManageCacheService = () => Container.get(ManageCacheService);
