import LocalAdapter from './adapter/localAdapter';
import SessionAdapter from './adapter/sessionAdapter';
import CookieAdapter from './adapter/cookieAdapter';
import WebsqlAdapter from './adapter/websqlAdapter';
import IndexdbAdapter from './adapter/indexdbAdapter';
import Adapter from './adapter/adapter';

type Storage = 'cookieStorage' | 'localStorage' | 'sessionStorage' | 'websqlStorage' | 'indexdbStorage';
class WebStorage {
  adapter: Adapter;

  getStorage(type: Storage): Adapter {
    switch (type) {
      case 'cookieStorage':
        return new CookieAdapter();
      case 'localStorage':
        return new LocalAdapter();
      case 'sessionStorage':
        return new SessionAdapter();
      case 'websqlStorage':
        return new WebsqlAdapter();
      case 'indexdbStorage':
        return new IndexdbAdapter();
      default:
        return new LocalAdapter();
    }
  }
}

// const storage = new WebStorage().getStorage('sessionStorage');
// (window as any).storage = storage;

export default WebStorage;
