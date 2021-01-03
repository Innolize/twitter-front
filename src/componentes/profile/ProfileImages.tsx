import { Box, Button, Container, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import React, { useRef, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { User } from '../../types/User';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative'
        },
        coverImageContainer: {
            width: "100%",
            minHeight: 200,
            maxHeight: 450,
        },
        coverImage: {
            maxWidth: "100%",
            objectFit: "contain"
        },
        editCoverImage: {
            backgroundColor: "black",
            opacity: "0.5",
            position: 'absolute',
            height: "300px",
            width: "100%",
            top: "0px",
            // border: "5px solid blue",
            visibility: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        userImageContainer: {
            position: "absolute",
            left: "30px",
            bottom: "-90px"
        },
        userImage: {
            border: "5px solid white",
            borderRadius: "50%",
        },
        editUserImage: {
            backgroundColor: "black",
            opacity: "0.5",
            position: 'absolute',
            height: "180px",
            width: "180px",
            top: "0px",
            borderRadius: "50%",
            border: "5px solid blue",
            visibility: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        buttonHeigth: {
            height: "40px"
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
            height: "90px"
        },
        visible: {
            visibility: "visible"
        }
    })
)

interface Props {
    user: User
}

export const ProfileImages: React.FC<Props> = ({ user }) => {
    const classes = useStyles()
    const [showEditAvatar, setShowEditAvatar] = useState<Boolean>(false)
    const [showEditCover, setShowEditCover] = useState<Boolean>(false)
    const coverRef = useRef<HTMLImageElement>(null)

    const hoverEnter = (setter: React.Dispatch<React.SetStateAction<Boolean>>) => {
        setter(true)
    }

    const hoverLeaves = (setter: React.Dispatch<React.SetStateAction<Boolean>>) => {
        setter(false)
    }

    return (
        <>
            <Box className={classes.container} >
                <div className={classes.coverImageContainer}>
                    <img
                        ref={coverRef}
                        onMouseEnter={() => hoverEnter(setShowEditCover)}
                        alt="user cover" src={"https://picsum.photos/1000/500"} className={classes.coverImage} />
                    <div
                        style={{ height: coverRef.current?.height }}
                        onMouseLeave={() => hoverLeaves(setShowEditCover)}
                        className={`${classes.editCoverImage} ${showEditCover ? classes.visible : ""}`}>
                        <EditIcon fontSize="large" color="primary"></EditIcon>
                    </div>
                </div>
                <div className={classes.userImageContainer}>
                    <img
                        onMouseEnter={() => hoverEnter(setShowEditAvatar)}
                        alt="user profile image" src={user.profilePicture || "https://picsum.photos/180/180"} className={classes.userImage}></img>
                    <div

                        onMouseLeave={() => hoverLeaves(setShowEditAvatar)}
                        className={`${classes.editUserImage} ${showEditAvatar ? classes.visible : ""}`}>
                        <EditIcon fontSize="large" color="primary"></EditIcon>
                    </div>
                </div>
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
