import { User } from "../User";

export const isUser = (param: any): param is User => {
    return typeof param?.name === "string" && typeof param?.surname === "string"
}