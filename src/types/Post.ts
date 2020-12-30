import { User } from "./User";

export interface Post {
    _id: string,
    message: string,
    author: User
}