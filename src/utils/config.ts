
/**
 * @author wangtao
 * 全局配置文件
 */

// 全局请求路由地址
let BaseUrlCustom = "http://localhost:9091/";


switch (location.hostname) {
  case 'localhost':
  case '127.0.0.1':
    BaseUrlCustom = "http://localhost:9091/";
    break;
  default:
    BaseUrlCustom = '/';
}

BaseUrlCustom = "http://62.234.14.42/";

const config = {
  BaseUrlCustom,
};

export default config;
