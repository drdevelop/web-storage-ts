# web-storage-ts

## 安装
npm i web-storage-ts -S

## 初始化
```ts
import WebStorage from 'web-storage-ts';
const storage = new WebStorage().getStorage('indexdbStorage');
```

## 提供的存储类型
> 目前我们支持所有的浏览器存储方式

### 同步存储
1. localStorage
2. cookieStorage
3. sessionStorage

### 异步存储
1. indexdbStorage
2. websqlStorage

## 使用
> 和localStorage一样用法即可

### 查询数据
```ts
  storage.getItem('key');
```
**注意:** 当使用`indexdbStorage`和`websqlStorage`时，`getItem`返回的结果是个`Promise`，其他的才是同步的结果

### 增加、修改、删除数据
```ts
  storage.setItem(key, value);
```
**提示:** 当value为null时，代表要删除该数据

## 扩展
### 过期时间设置
`暂未上线，敬请期待~`
