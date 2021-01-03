import { Post } from "../Post";

export const isPostArray = (param: any): param is Post[] => {
    return typeof param?.[0]?.message === "string"
}