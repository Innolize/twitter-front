import { Avatar, Card, CardActions, CardContent, CardHeader, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 1px"
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

interface PostProps {

}

export const Post: React.FC<PostProps> = ({ }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root} id="contenedor-post">
            <CardHeader
                avatar={<Avatar src="https://s6.eestatic.com/2019/11/14/omicrono/Omicrono_444466491_137907739_1706x960.jpg" className={classes.large} />}
                title="Nombre usuario"
                subheader="22:45"
            />
            <CardContent>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas obcaecati, placeat deserunt id perspiciatis numquam sequi, cupiditate cum quasi ab a quos accusantium blanditiis architecto voluptate eius impedit at.
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
        </Card>
    );
}