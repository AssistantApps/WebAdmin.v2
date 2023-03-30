export interface DataWithExpiry<T> {
    value: T;
    expiredAfter: Date;
}
