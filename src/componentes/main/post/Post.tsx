import { Avatar, Card, CardActions, CardContent, CardHeader, createStyles, Fade, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react'
import { Post as IPost } from '../../../types/Post'
import moment from 'moment';
import { Comment } from '../comment/Comment';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 1px",
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        cardAction: {
            display: "flex",
            justifyContent: "space-around"
        }
    })
)

interface Props {
    post: IPost
    order?: number
}

export const Post: React.FC<Props> = ({ post, order = 1 }) => {
    const classes = useStyles()
    const createdSince = moment(post.createdAt).fromNow()

    return (
        <Fade in={true} style={{ transitionDelay: `${order * 300}ms` }}>
            <div >
                <Card className={classes.root} id="contenedor-post" variant="outlined">
                    <CardHeader
                        avatar={<Avatar src="https://s6.eestatic.com/2019/11/14/omicrono/Omicrono_444466491_137907739_1706x960.jpg" className={classes.large} />}
                        title={`${post.author.name} ${post.author.surname}`}
                        subheader={createdSince}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            {post.message}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                    <Comment></Comment>
                </Card>

            </div>
        </Fade>
    );
}