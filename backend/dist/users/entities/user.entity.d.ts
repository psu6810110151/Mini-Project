export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
