import { Box, Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { User } from '../../types/User';
import { OptionsMenu, OptionMenuAction } from '../common/OptionsMenu';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative'
        },
        coverImageContainer: {
            width: "100%",
            minHeight: 200,
            maxHeight: 450,
            display: "flex",
            justifyContent: "center"
        },
        coverImage: {
            maxWidth: "100%",
            objectFit: "contain",
            maxHeight: 450,
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
            borderRadius: "50%",
            position: "absolute",
            left: "30px",
            bottom: "-90px",
            width: "180px",
            height: "180px",
            display: "flex",
            justifyContent: "center",
            [theme.breakpoints.down('sm')]: {
                width: "120px",
                height: "120px",
                left: "30px",
                bottom: '-60px'
            }

        },
        userImage: {
            borderRadius: "50%",
            objectFit: "cover",
            width: "180px",
            height: "180px",
            border: "5px solid white",
            backgroundColor: "gray",
            [theme.breakpoints.down('sm')]: {
                width: "120px",
                height: "120px",
            }
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
            alignItems: "center",
            [theme.breakpoints.down('sm')]: {
                width: "120px",
                height: "120px",
                bottom: '-60px'
            }
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
    edit?: boolean
    onClickCoverImage: () => void
    onClickProfileImage: () => void
}

export const ProfileImages: React.FC<Props> = ({ user, edit, onClickCoverImage, onClickProfileImage }) => {
    const classes = useStyles()
    const history = useHistory()
    const [showEditAvatar, setShowEditAvatar] = useState<Boolean>(false)
    const [showEditCover, setShowEditCover] = useState<Boolean>(false)
    const coverRef = useRef<HTMLImageElement>(null)



    const hoverEnter = (setter: React.Dispatch<React.SetStateAction<Boolean>>) => {
        setter(true)
    }

    const hoverLeaves = (setter: React.Dispatch<React.SetStateAction<Boolean>>) => {
        setter(false)
    }

    const editProfileMenu: OptionMenuAction[] = [
        { description: "Edit Profile", action: () => history.push(`/main/editProfile/${user._id}`) }
    ]

    return (
        <>
            <Box className={classes.container} >
                <div className={classes.coverImageContainer}>
                    <img
                        ref={coverRef}
                        onMouseEnter={() => hoverEnter(setShowEditCover)}
                        alt="user cover" src={user.cover || "https://picsum.photos/1000/500"} className={classes.coverImage}
                        onClick={onClickCoverImage}
                    />
                    <div
                        style={{ height: coverRef.current?.height }}
                        onMouseLeave={() => hoverLeaves(setShowEditCover)}
                        onClick={onClickCoverImage}
                        className={`${classes.editCoverImage} ${showEditCover ? classes.visible : ""}`}>
                        {edit ? <EditIcon fontSize="large" color="primary"></EditIcon> : <SearchIcon fontSize="large" color="primary" ></SearchIcon>}
                    </div>
                </div>
                <div className={classes.userImageContainer}>
                    <img
                        onMouseEnter={() => hoverEnter(setShowEditAvatar)}
                        onClick={onClickProfileImage}
                        alt="user profile " src={user.profilePicture || "https://picsum.photos/180/180"} className={classes.userImage}></img>
                    <div
                        onClick={onClickProfileImage}
                        onMouseLeave={() => hoverLeaves(setShowEditAvatar)}
                        className={`${classes.editUserImage} ${showEditAvatar ? classes.visible : ""}`}>
                        {edit ? <EditIcon fontSize="large" color="primary"></EditIcon> : <SearchIcon fontSize="large" color="primary" ></SearchIcon>}
                    </div>
                </div>
            </Box>
            {!edit && <Box className={classes.buttonContainer}>
                <OptionsMenu selfActions={editProfileMenu}></OptionsMenu>
                <Button variant="outlined" color="primary" className={classes.buttonHeigth}> Follow</Button>
            </Box>}
        </>
    )
}
