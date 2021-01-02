import { IComment } from "../Comment";

export const isCommentArray = (param: any): param is IComment[] => {
    return typeof param?.[0]?.authorId === "string" && typeof param[0].message === "string" && typeof param[0].postId === "string"
}