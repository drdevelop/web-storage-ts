import Adapter, { Config } from './adapter';

class CookieAdapter implements Adapter {
  getItem(key: string) {
    const cookies = document.cookie.split(/;\s?/);
    let i = 0;
    while (i < cookies.length) {
      const keyAndValue = cookies[i].split('=');
      if (keyAndValue[0] === key) {
        return keyAndValue[1];
      }
      i++;
    }
    return null;
  }

  setItem(key: string, value: any, config: Config = {}) {
    const item = {
      [key]: value,
    };
    if (config.expires) {
      item.expires = new Date(config.expires).toUTCString();
    }
    let setKeys = Object.keys(item);
    let cookieStr = setKeys.map(key => `${key}=${item[key]};`).join('');
    document.cookie = cookieStr;
  }
}

export default CookieAdapter;
