export const REGEX = {
    USERNAME: /^\w{2,20}$/,
    PASSWORD: /^.{6,}$/,
    EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    VERIFICATION_CODE: /^[a-z0-9]{4}$/,
    YEAR: /^\d{4}$/,
    MONTH: /^\d{2}$/,
    DAY: /^\d{2}$/,
    SCHEDULE_TEXT: /^.{1,255}$/,
};

export const REGEX_TEXT = {
    USERNAME: '2~20 位的数字、字母及下划线',
    PASSWORD: '6 位以上的任意字符',
};