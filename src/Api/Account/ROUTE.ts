import {accountPrefix} from './Function';

export const LOGIN = accountPrefix('/login');

export const LOGOUT = accountPrefix('/logout');

export const GET_USER_PROFILE = accountPrefix('/getUserProfile');

export const UPLOAD_AVATAR = accountPrefix('/uploadAvatar');

export const SEND_VERIFICATION_CODE_BY_EMAIL = accountPrefix('/sendVerificationCodeByEmail');

export const SIGN_UP = accountPrefix('/signUp');

export const SEND_VERIFICATION_CODE_BY_USERNAME = accountPrefix('/sendVerificationCodeByUsername');

export const RETRIEVE_PASSWORD = accountPrefix('/retrievePassword');

export const CHANGE_PASSWORD = accountPrefix('/changePassword');

export const CHANGE_EMAIL = accountPrefix('/changeEmail');