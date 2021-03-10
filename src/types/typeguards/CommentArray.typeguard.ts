import { IComment } from "../Comment";

export const isCommentArray = (param: any): param is IComment[] => {
    return typeof param?.[0]?.author._id === "string" && typeof param[0].message === "string"
}