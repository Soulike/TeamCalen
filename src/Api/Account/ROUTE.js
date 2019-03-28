import {accountPrefix} from './Function';

export const LOGIN = accountPrefix('/login');

export const SEND_VERIFICATION_CODE_BY_EMAIL = accountPrefix('/sendVerificationCodeByEmail');

export const SIGN_UP = accountPrefix('/signUp');

export const SEND_VERIFICATION_CODE_BY_USERNAME = accountPrefix('/sendVerificationCodeByUsername');

export const RETRIEVE_PASSWORD = accountPrefix('/retrievePassword');