import { isJSON } from '../utils/object';
import Adapter, { Config } from './adapter';

class LocalAdapter implements Adapter {
  getItem(key: string) {
    let data: any = localStorage.getItem(key);
    if (isJSON(data)) {
      data = JSON.parse(data);
      return data.value ? data.value : data;
    }
    return data;
  }

  setItem(key: string, value: any, config: Config = {}) {
    try {
      const data = {
        expires: '-1',
        value,
      };
      if (config?.expires) {
        data.expires = new Date(config.expires).toUTCString();
      }
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (err) {
      console.log('存储失败', err);
      return false;
    }
  }
}

export default LocalAdapter;
