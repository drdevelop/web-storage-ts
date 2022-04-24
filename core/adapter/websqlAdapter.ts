import { isJSON } from '../utils/object';
import Adapter from './adapter';

interface Result {
  rows: IArguments;
}

interface Table {
  executeSql: (
    sql: string,
    arg1: any,
    onSuccess: (tx, result: Result) => void,
    onError: (tx, error) => void
  ) => void;
}

interface Db {
  transaction: (cb: (table: Table) => void) => void;
}

class WebsqlAdapter implements Adapter {
  private dbName = 'webStorage';
  private tableName = 'test';
  db: Db;

  constructor() {
    this.mounted();
  }

  private executeSql(sql: string) {
    return new Promise((resolve, reject) => {
      this.db.transaction(function(table) {
        table.executeSql(
          sql,
          [],
          (tx, result) => {
            console.log('executeSql success', sql, result);
            resolve([...result.rows]);
          },
          (tx, error) => {
            console.log('executeSql error', sql, error);
            reject(error);
          },
        )
      })
    })
  }

  private createTable() {
    return this.executeSql(`create table IF NOT EXISTS ${this.tableName} (key unique, value, expires)`);
  }

  private dropTable() {
    return this.executeSql(`DROP TABLE ${this.tableName}`);
  }

  private async select(key: string) {
    const rows = await this.executeSql(`SELECT * FROM ${this.tableName} where key='${key}'`);
    let value = rows[0]?.value;
    if (isJSON(value)) {
      value = JSON.parse(value);
    }
    console.log('result', value);
    return value;
  }

  private async put(data) {
    const value = typeof data.value === 'object' ? JSON.stringify(data.value) : data.value;
    const expires = data.expires ? new Date(data.expires).toUTCString() : '-1';
    const sql = `INSERT INTO ${this.tableName} (key, value, expires) VALUES ('${data.key}', '${value}', '${expires}')`;
    return await this.executeSql(sql);
  }

  private async delete(key: string) {
    await this.executeSql(`DELETE FROM ${this.tableName} where key='${key}'`);
  }

  private mounted() {
    try {
      const db = (window as any).openDatabase(this.dbName, 1, '测试数据库', 1024 * 1024 * 10, (res) => {
        console.log('openDatabase', res)
      });
      if (!db) {
        console.log('数据库创建失败');
      }
      this.db = db;
    } catch (err) {
      console.log('数据库创建失败', err)
    }
    this.createTable();
  }

  getItem(key: string) {
    return this.select(key);
  }

  setItem(key: string, value: any): Promise<any> {
    if (value !== null) {
      return this.put({ key, value });
    } else {
      return this.delete(key);
    }
  }
}

export default WebsqlAdapter;
