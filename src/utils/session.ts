export interface Util {
  set: (key: string , value: any) => void;
  get: (key: string) => any;
  remove: (remove?: string) => void;
}

const util: Util = {
  set: (key: string , value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    // window.sessionStorage.setItem(key, value);
  },
  // 获取sessionStorage
  get: ( key: string) => {
    const temp: any = window.sessionStorage.getItem(key);
    return JSON.parse(temp);
    // return temp;
  },
  remove: ( key?: string) => {
    if (key) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.clear();
    }
  },
};

export default util ;
