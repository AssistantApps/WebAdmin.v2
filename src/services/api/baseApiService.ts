import axios, { AxiosResponse } from 'axios';

import { Result, ResultWithValue } from '../../contracts/resultWithValue';
import { anyObject } from '../../helper/typescriptHacks';

export class BaseApiService {
  private _baseUrl?: String;
  constructor(newBaseUrl?: String) {
    if (newBaseUrl != null) this._baseUrl = newBaseUrl;
  }
  protected async get<T>(
    url: string,
    manipulateHeaders?: () => any,
    manipulateResponse?: (data: AxiosResponse<T, any>) => any
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }
    try {
      const result = await axios.get<T>(`${this._baseUrl}/${url}`, options);

      if (manipulateResponse != null) {
        return manipulateResponse(result);
      }

      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      };

    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: (ex as any).message
      }
    }
  }

  protected async post<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => any,
    customMapper?: (data: any) => any
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    try {
      const result = await axios.post<T>(`${this._baseUrl}/${url}`, data, options);
      if (customMapper != null) return customMapper(result);
      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: (ex as any).message
      }
    }
  }

  protected async put<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => any,
    customMapper?: (data: any) => any
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    try {
      const result = await axios.put<T>(`${this._baseUrl}/${url}`, data, options);
      if (customMapper != null) return customMapper(result);
      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: (ex as any).message
      }
    }
  }

  protected async delete(
    url: string,
    manipulateHeaders?: () => any,
  ): Promise<Result> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    try {
      const result = await axios.delete(`${this._baseUrl}/${url}`, options);
      return {
        isSuccess: true,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        errorMessage: (ex as any).message
      }
    }
  }
}
