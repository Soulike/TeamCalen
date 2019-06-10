/**
 * @class
 * @description 用户资料类，对应数据库的 UserProfile 表
 * */
export class UserProfile
{
    public id?: number;
    public avatar?: Buffer | null;
    public motto?: string | null;
    public username?: string | null;
    public email?: string | null;

    constructor(id?: number, avatar?: Buffer | null, motto?: string | null, email?: string | null, username?: string | null)
    {
        this.id = id;
        this.avatar = avatar;
        this.motto = motto;
        this.email = email;
        this.username = username;
    }

    static from(obj: any)
    {
        return new UserProfile(
            obj.id,
            obj.avatar ? Buffer.from(obj.avatar) : obj.avatar,
            obj.motto,
            obj.email,
            obj.username,
        );
    }
}