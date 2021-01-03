import { Box, Button, Container, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import React from 'react'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative'
        },
        coverImage: {
            width: "100%",
            minHeight: 300,
            maxHeight: 450,
            objectFit: "cover"
        },
        userImage: {
            border: "5px solid white",
            borderRadius: "50%",
            position: "absolute",
            left: "50px",
            bottom: "-90px"
        },
        buttonHeigth: {
            height: "40px"
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
            height: "90px"
        }
    })
)

interface Props {

}

export const ProfileImages: React.FC<Props> = ({ }) => {
    const classes = useStyles()
    return (
        <>
            <Box className={classes.container} >
                <img  alt="prop" src="https://picsum.photos/600/300" className={classes.coverImage}></img>
                <img src="https://picsum.photos/150/180" className={classes.userImage}></img>
            </Box>
            <Box className={classes.buttonContainer}>
                <IconButton color="primary" className={classes.buttonHeigth}>
                    <MoreVertIcon></MoreVertIcon>
                </IconButton>
                <Button variant="outlined" color="primary" className={classes.buttonHeigth}> Follow</Button>
            </Box>
        </>
    )
}
