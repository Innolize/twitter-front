type ICommentAuthor = {
    _id: string,
    profilePicture: string,
    name: string,
    surname: string,
}

export type IComment = {
    postId: string,
    author: ICommentAuthor,
    message: string,
    likes: string[]
}