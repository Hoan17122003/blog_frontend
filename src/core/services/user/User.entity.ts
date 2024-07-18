enum Role {
    ADMIN = "admin",
    USER = "user",
}

export default class User {
    constructor(
        private username: string,
        private password: string,
        private fullname: string,
        private email: string
    ) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
    }

    public getUsername(): string {
        return this.username;
    }
    public getPassword(): string {
        return this.password;
    }

    public getFullname(): string {
        return this.fullname;
    }
    public getRole(): string {
        return this.role;
    }
    public getEmail(): string {
        return this.email;
    }
}
