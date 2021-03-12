// 开发环境
const developUrl = 'https://data.58ln.cn/api';

// 测试环境
const testUrl = 'https://sqttest.58ln.cn/api';

// 正式（线上）环境
const formalUrl = 'https://yq.bkshequ.com/api';

let baseUrl = developUrl;;
let localHref = window.location.href;

if (localHref.includes('localhost')) {
    baseUrl = developUrl;
}
if (localHref.includes('sqttest.58ln.cn')) {
    baseUrl = testUrl;
}
if (localHref.includes('yq.bkshequ.com')) {
    baseUrl = formalUrl;
}
export default baseUrl;