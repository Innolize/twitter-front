import { IComment } from "./Comment";
import { User } from "./User";

export type Post = {
    _id: string,
    message: string,
    author: User,
    createdAt: string,
    updatedAt: string,
    likesArr: string[],
    likesNumb: number,
    commentsArr: IComment[],
    commentsNumb: number
}