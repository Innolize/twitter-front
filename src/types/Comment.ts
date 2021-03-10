type ICommentAuthor = {
    _id: string,
    profilePicture: string,
    name: string,
    surname: string,
}

export type IComment = {
    _id: string,
    postId: string,
    author: ICommentAuthor,
    message: string,
    likesArr: string[],
    likesNumb: number
}