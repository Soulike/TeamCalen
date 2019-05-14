export class UserInfo
{
    public username: string;
    public avatarSrc?: string;

    constructor(username: string, avatarSrc?: string)
    {
        this.username = username;
        this.avatarSrc = avatarSrc;
    }
}