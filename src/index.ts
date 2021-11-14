import { openDB as originalOpenDB } from 'idb';
import type { IDBPDatabase } from 'idb';
// import {} from 'crypto-js';

export { deleteDB, unwrap, wrap } from 'idb';
export type {
    TypedDOMStringList,
    StoreValue,
    StoreNames,
    StoreKey,
    IndexNames,
    OpenDBCallbacks,
    IndexKey,
    IDBPTransaction,
    IDBPObjectStore,
    DBSchema,
    DeleteDBCallbacks,
    IDBPCursor,
    IDBPCursorIteratorValue,
    IDBPIndex,
    IDBPDatabase,
    IDBPCursorWithValueIteratorValue,
    IDBPCursorWithValue,
} from 'idb';

const createEncryptedProxyIDBPDatabase = <DBTypes>(
    db: IDBPDatabase<DBTypes>,
    encode: (value: string) => string,
    decode: (value: string) => string
): IDBPDatabase<DBTypes> => {
    const originalGet = db.get;
    db.get = (...args) => originalGet.apply(db, args);

    const originalGetAll = db.getAll;
    db.getAll = (...args) => originalGetAll.apply(db, args);

    const originalGetFromIndex = db.getFromIndex;
    db.getFromIndex = (...args) => originalGetFromIndex.apply(db, args);

    const originalGetAllFromIndex = db.getAllFromIndex;
    db.getAllFromIndex = (...args) => originalGetAllFromIndex.apply(db, args);

    return db;
};

export const openDB: typeof originalOpenDB = (...args) => {
    const encode = () => '';
    const decode = () => '';

    return originalOpenDB(...args).then((result) =>
        createEncryptedProxyIDBPDatabase(result, encode, decode)
    );
};
