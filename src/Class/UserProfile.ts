export class UserProfile
{
    public avatar?: Buffer | null;
    public motto?: string | null;
    public username?: string | null;
    public email?: string | null;

    constructor(username?: string | null, avatar?: Buffer | null, motto?: string | null, email?: string | null)
    {
        this.username = username;
        this.avatar = avatar;
        this.motto = motto;
        this.email = email;
    }
}