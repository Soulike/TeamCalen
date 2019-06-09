# 接口文档

所有的请求体、响应体表示方式均以 TypeScript 的表示方式为准。

## 返回格式约定

所有后台返回的数据格式均为 JSON，JSON 对应对象格式如下

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
- 响应体：指返回 JSON 中 data 键对应对象的内容

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
    public id?: number;      // id
    public day?: Date;          // 所属日期
    public startTime?: Date | null;    // 开始时间，包括年月日时间
    public endTime?: Date | null;      // 结束时间
    public scheduleText?: string;   // 日程的具体内容
    public hasReminder?: boolean;   // 是否有提醒，默认值 false
    public scheduleState?: SCHEDULE_STATE;    // 枚举值，日程的状态，默认值 SCHEDULE_STATE.UNFINISHED'
    public username?: string | null;            // 日程所属的人
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

### `UserProfile`

用户信息类。

```ts
class UserProfile
{
    public avatar?: Buffer | null;
    public motto?: string | null;
    public username?: string | null;

    constructor(username?: string | null, avatar?: Buffer | null, motto?: string | null)
    {
        this.username = username;
        this.avatar = avatar;
        this.motto = motto;
    }
}
```

---

## 各个请求的详细信息 (所有请求前缀均为 `/server`)

### 帐号管理部分（请求前缀为 `/account`）

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

#### `/getUserProfile`

- 功能说明：获取当前登录用户信息
- 请求方法：GET
- 请求体：无
- 响应体：[用户信息类](#UserProfile)的实例
- 其他说明：无

#### `/uploadAvatar`

- 功能说明：上传用户头像
- 请求方法：PUT
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
    schedules: Array<Schedule>,
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
    schedules: Array<Schedule>,
}
```
- 其他说明
  - 数组中日程信息的顺序应当按照开始时间升序，即早的在前，晚的在后

#### `/changeScheduleState`

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

#### `/modifySchedule`

- 功能说明：编辑日程信息
- 请求方法：POST
- 请求体：
```ts
{
    scheduleId: number,
    schedule: Schedule,
}
```
- 响应体：无
- 其他说明：
  - Schedule 实例中有什么项目更改什么项目，不存在的项目就不做更改

#### `/createSchedule`

- 功能说明：创建新日程
- 请求方法：POST
- 请求体：
```ts
{
    schedule: Schedule,
}
```
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
- 响应体：一个 [Schedule](#Schedule) 的实例
- 其他说明：无
