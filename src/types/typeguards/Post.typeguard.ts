import { Post } from "../Post";

export const isPost = (param: any): param is Post => {
    return typeof param?.commentsNumb === "number"
}