export interface Config {
  /** 过期时间 */
  expires?: string | number;
}

class Adapter {
  getItem: (key: string) => any;

  setItem: (key: string, value: any, config?: Config) => void | boolean | Promise<boolean>;

  setItems?: (item: { key: string, value: any, config?: Config }[]) => void | boolean;
}

export default Adapter;
