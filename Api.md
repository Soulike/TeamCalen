# 接口文档

所有的请求体、响应体表示方式均以 TypeScript 的表示方式为准。

## 返回格式约定

所有后台返回的数据格式均为 tsON，tsON 对应对象格式如下

```ts
{
    code: number,               // 本次请求状态
    data?: object,              // 若请求处理成功，需要返回的数据
    reason?: object | string,   // 若请求处理失败，失败的原因（主要用于调试）
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

`data` 的具体格式见下方文档的“响应体”部分。

---

## 名词解释

- 请求体：在 GET 请求中指查询字符串内容，在 POST 请求中指请求体中内容
- 响应体：指返回 tsON 中 data 键对应对象的内容

---

## 输入约束

目前项目用到的正则表达式如下

```ts
export const REGEX = {
    USERNAME: /^\w{2,20}$/,
    PASSWORD: /^.{6,}$/,
    EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    VERIFICATION_CODE: /^[A-z0-9]{4}$/,
    YEAR: /^\d{4}$/,
    MONTH: /^\d{2}$/,
    DAY: /^\d{2}$/,
    SCHEDULE_TEXT: /^.{1,255}$/,
};
```

具体限制为：

- 用户名：字母、数字与下划线，2 到 20 个字符
- 密码：任意字符，6 位以上
- 验证码：数字与字母，4 位
- 年份：4 位数字
- 月份：2 位数字
- 日：2 位数字
- 日程内容：1~255 位任意字符

---

## 所有用到的类、接口与枚举

### `Schedule`

日程类。

```ts
class Schedule 
{
    year: string;           // 年份，四位整数字符串
    month: string;          // 月份，两位整数字符串
    day: string;            // 日，两位整数字符串
    startHour: number;      // 开始小时，0-23 整数
    startMinute: number;    // 开始分钟，0-59 整数
    endHour: number;        // 结束小时，0-23 整数
    endMinute: number;      // 结束分钟，0-59 整数
    scheduleText: string;   // 日程的具体内容
    hasReminder?: boolean,   // 是否有提醒，默认值 false
    scheduleState?: SCHEDULE_STATE;    // 枚举值，日程的状态，默认值 SCHEDULE_STATE.UNFINISHED'
}
```

### `RequestSchedule`

请求用日程类，继承自 `Schedule` 类，但并没有添加任何新的内容。

```ts
class RequestSchedule extents Schedule {}
```

### `ResponseSchedule`

响应用日程类，继承自 `Schedule` 类，但添加了日程 id。

```ts
class ResponseSchedule extents Schedule
{
    id: number;
}
```

### `SCHEDULE_STATE`

日程状态枚举类型。

```ts
enum SCHEDULE_STATE 
{
    FINISHED = 'finished';
    UNFINISHED = 'unfinished';
    CANCELED = 'canceled';
};
```

### `UserInfo`

用户信息类。

```ts
class UserInfo
{
    username: string;
    avatarSrc?: string;
}
```

---

## 各个请求的详细信息 (所有请求前缀均为 `/server`)

### 帐号管理部分（请求前缀为 `/account`，由其他后台模块接管）

#### `/login`

- 功能说明：用户登录并下发 Session
- 请求方法：POST
- 请求体：
```ts
{
    username: string,       // 用户名
    password: string,       // 密码
}
```
- 其他说明：无

#### `/logout`

- 功能说明：退出登录，销毁用户当前 Session
- 请求方法：POST
- 请求体：无
- 响应体：无
- 其他说明：无

#### `/getUserInfo`

- 功能说明：获取当前登录用户信息
- 请求方法：GET
- 请求体：无
- 响应体：[用户信息类](#UserInfo)的实例
- 其他说明：无

#### `/uploadAvatar`

- 功能说明：上传用户头像
- 请求方法：POST
- 请求体：FormData 对象，其中的域有
  - `avatar`：文件的二进制内容
- 响应体：无
- 其他说明：无

---

### 日程管理模块（请求前缀为 `/schedule`）

#### `/getEveryDayScheduleAmountInAMonth`

- 功能说明：获取指定年月中每一天的日程数量
- 请求方法：GET
- 请求体：
```ts
{
    year: string,   // 年，如 '2019' 表示 2019 年
    month: string,  // 月，如 '03' 表示 3 月
}
```
- 响应体：
```ts
{
    scheduleAmount: Array<number>,      // 数组，内容为整数

    // 这个数组从 0 开始，放置指定月所有天的日程数量。下标 0 的数据代表 1 号的日程数量，下标 1 的数据代表 2 号的日程数量，以此类推
}
```
- 其他说明：无

#### `/getRecentSchedules`

- 功能说明：返回用户从今天起到未来的特定条日程
- 请求方法：GET
- 请求体：
```ts
{
    amount: number,     // 返回多少条
}
```
- 响应体：
```ts
{
    schedules: Array<ResponseSchedule>,
}
```
- 其他说明：
  - 数组中日程信息的顺序应当按照开始时间升序，即早的在前，晚的在后
  - 如果存在的日程数量不够，就有多少个返回多少个

#### `/getSchedulesByDay`

- 功能说明：得到某一天的所有日程
- 请求方法：GET
- 请求体：
```ts
{
    year: string,   // 年
    month: string,  // 月
    day: string,    // 日
}
```
- 响应体：
```ts
{
    schedules: Array<ResponseSchedule>,
}
```
- 其他说明
  - 数组中日程信息的顺序应当按照开始时间升序，即早的在前，晚的在后

#### `/changeScheduleState` // state 参数类型被更改

- 功能说明：切换日程完成状态
- 请求方法：POST
- 请求体：
```ts
{
    scheduleId: number,     // 日程的唯一识别 ID
    state: SCHEDULE_STATE.FINISHED | SCHEDULE_STATE.UNFINISHED,
}
```
- 响应体：无
- 其他说明：无

#### `/resumeSchedule`

- 功能说明：恢复已经被取消的日程
- 请求方法：POST
- 请求体：
```ts
{
    scheduleId: number,     // 日程的唯一识别 ID
}
```
- 响应体：无
- 其他说明：日程恢复后进入未完成状态

#### `/cancelSchedule`

- 功能说明：取消日程
- 请求方法：POST
- 请求体：
```ts
{
    scheduleId: number,     // 日程的唯一识别 ID
}
```
- 响应体：无
- 其他说明：无

#### `/deleteSchedule`

- 功能说明：删除日程
- 请求方法：POST
- 请求体：
```ts
{
    scheduleId: number,     // 日程的唯一识别 ID
}
```
- 响应体：无
- 其他说明：
  - 删除和取消的区别：删除后日程将不会再出现在日程列表中，而取消会显示取消状态

#### `/modifySchedule`  // 请求体有修改

- 功能说明：编辑日程信息
- 请求方法：POST
- 请求体：
```ts
{
    scheduleId: number,
    schedule: RequestSchedule,
}
```
- 响应体：无
- 其他说明：
  - Schedule 实例中有什么项目更改什么项目，不存在的项目就不做更改

#### `/createSchedule`

- 功能说明：创建新日程
- 请求方法：POST
- 请求体：一个 [RequestSchedule](#RequestSchedule) 的实例
- 响应体：无
- 其他说明：无

#### `/getScheduleById`

- 功能说明：根据 ID 返回对应日程信息
- 请求方法：GET
- 请求体：
```ts
{
    scheduleId: Number,     // 日程的 ID
}
```
- 响应体：一个 [ResponseSchedule](#ResponseSchedule) 的实例
- 其他说明：无
