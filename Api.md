# 接口文档

## 返回格式约定

所有后台返回的数据格式均为 JSON，JSON 对应对象格式如下

```js
{
    code: Number,
    data: Object
}
```

`code` 指定这次请求的状态，前端可以根据这个编码来决定做什么。目前需要的代码如下

- 200 请求成功
- 400 请求参数不正确，比如提交的对象需要提供键 a 但提交上来的对象没有
- 401 当前请求 Session 无效
- 403 请求被拒绝，用于处理不合理的请求，例如登录密码错误或删除别人的东西
- 404 请求的内容不存在
- 409 请求与服务器端资源冲突
- 500 服务器发生错误

`data` 的具体格式根据情况决定。

---

## 名词解释

- 请求体：在 GET 请求中指查询字符串内容，在 POST 请求中指请求体中内容。项目不会出现其他请求方式
- 响应体：指返回 JSON 中 data 键对应对象的内容

---

## 输入约束

目前项目用到的正则表达式如下

```js
export const REGEX = {
    USERNAME: /^\w{2,20}$/,
    PASSWORD: /^.{6,}$/,
    EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    VERIFICATION_CODE: /^[A-z0-9]{4}$/,
};
```

具体限制为：

- 用户名：字母、数字与下划线，2 到 20 个字符
- 密码：任意字符，6 位以上
- 验证码：数字与字母，4 位

---

## 各个请求的详细信息 (所有请求前缀均为 `/server`)

### 账户部分（请求前缀为 `/account`）

#### `/login`

- 功能说明：用户登录并下发 Session
- 请求方法：POST
- 请求体：
```js
{
    username: String,       // 用户名
    password: String,       // 密码
}
```
- 其他说明：无

#### `/sendVerificationCodeByEmail`

- 功能说明：向指定邮箱发送验证码
- 请求方法：POST
- 请求体：
```js
{
    email: String,
}
```
- 响应体：无
- 其他说明：无

#### `/signUp`

- 功能说明：用户注册
- 请求方法：POST
- 请求体：
```js
{
    username: String,
    password: String,
    email: String,
    verificationCode: String,
}
```
- 其他说明：用户名不允许重复，如果发生重复返回 409

#### `/sendVerificationCodeByUsername`

- 功能说明：向指定用户名对应的邮箱发送验证码
- 请求方法：POST
- 请求体：
```js
{
    username: String,
}
```
- 响应体：无
- 其他说明：如果用户名不存在，返回 404

#### `/retrievePassword`

- 功能说明：找回密码
- 请求方法：POST
- 请求体：
```js
{
    username: String,
    verificationCode: String,
    password: String,           // 新密码
}
```
- 响应体：无
- 其他说明
  - 如果用户名不存在，返回 404
  - 如果验证码错误，返回 403