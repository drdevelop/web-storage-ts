import LocalAdapter from './adapter/localAdapter';
import SessionAdapter from './adapter/sessionAdapter';
import CookieAdapter from './adapter/cookieAdapter';
import WebsqlAdapter from './adapter/websqlAdapter';
import IndexdbAdapter from './adapter/indexdbAdapter';
import Adapter from './adapter/adapter';

type Storage = 'cookieStorage' | 'localStorage' | 'sessionStorage' | 'websqlStorage' | 'indexdbStorage';

// Factory Method
function createStorage(type: Storage): Adapter {
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

export default createStorage;
