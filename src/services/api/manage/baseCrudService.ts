import { IApiSearch } from '../../../contracts/apiObjects';
import { ResultWithValue, Result } from '../../../contracts/resultWithValue';
import { getStateService } from '../../store/stateService';

export interface BaseCrudService<T> {
    read(guid: string): Promise<ResultWithValue<T>>;
    readAll(search?: IApiSearch): Promise<ResultWithValue<Array<T>>>;
    create(item: T): Promise<Result>;
    update(item: T): Promise<Result>;
    del(item: T): Promise<Result>;
}

export const addAccessTokenToHeaders = () => {
    const accessToken: string = getStateService().getState().auth.token ?? '';
    return ({
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
}

export const formDataWithAccessTokenHeaders = () => {
    const onlyAccessToken = addAccessTokenToHeaders();
    return ({
        ...onlyAccessToken,
        headers: {
            ...onlyAccessToken.headers,
            'Content-Type': 'multipart/form-data',
        }
    });
}