import { IComment } from "../Comment";

export const isComment = (param: any): param is IComment => {
    return typeof param.postId === "string"
        && typeof param.authorId === "string"
        && typeof param.message === "string"
}