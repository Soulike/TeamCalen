export class UserProfile
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