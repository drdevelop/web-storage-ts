import Adapter, { Config } from './adapter';

class IndexdbAdapter implements Adapter {
  private dbName = 'webStorage';
  private tableName = 'test';
  db: IDBDatabase;

  constructor() {
    this.mounted();
  }

  private mounted() {
    const request = indexedDB.open(this.dbName, 1);
    const adapterInstance = this;
    request.onsuccess = function (event) {
      console.log('open db success');
      const db = this.result;
      adapterInstance.db = db;
    }
    request.onupgradeneeded = function(event) {
      console.log('onupgradeneeded');
      const db = this.result;
      adapterInstance.db = db;
      // 建表
      const store = db.createObjectStore(adapterInstance.tableName, { keyPath: 'key', autoIncrement: true });
      store.createIndex('key', 'key', { unique: true });
      store.createIndex('value', 'value', { unique: false });
      store.createIndex('expires', 'expires', { unique: false });
    }
  }

  private getTable(mode: IDBTransactionMode) {
    if (!this.db) return null;
    const transaction = this.db.transaction(this.tableName, mode);
    const store = transaction.objectStore(this.tableName);
    return store;
  }

  getItem(key: string) {
    const table = this.getTable('readonly');
    if (!table) return null;
    return new Promise((resolve, reject) => {
      const request = table.get(key);
      request.onsuccess = function(event: any) {
        resolve(event.target.result.value);
      }
      request.onerror = reject;
    })
  }

  setItem(key: string, value: any, config: Config = {}): false | Promise<boolean> {
    if (value === null) {
      return this.deleteItem(key);
    }
    const table = this.getTable('readwrite');
    if (!table) return false;
    return new Promise((resolve, reject) => {
      const data: any = {
        key,
        value,
        expires: '-1',
      };
      if (config?.expires) {
        data.expires = new Date(config.expires).toUTCString();
      }
      const storeRequest = table.put(data);
      storeRequest.onsuccess = () => {
        resolve(true);
      }
      storeRequest.onerror = function(event: any) {
        reject(event.target.error);
      };
    })
  }

  private deleteItem(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const table = this.getTable('readwrite');
      if (!table) reject(false);
      const storeRequest = table.delete(key);
      storeRequest.onsuccess = () => {
        resolve(true);
      }
      storeRequest.onerror = (event: any) => {
        reject(event.target.error);
      }
    })
  }
}

export default IndexdbAdapter;
