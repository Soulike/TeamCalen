export const REGEX = {
    USERNAME: /^\w{2,20}$/,
    PASSWORD: /^.{6,}$/,
    EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    VERIFICATION_CODE: /^[A-z0-9]{4}$/,
};

export const REGEX_TEXT = {
    USERNAME: '2~20 位的数字、字母及下划线',
    PASSWORD: '6 位以上的任意字符',
};