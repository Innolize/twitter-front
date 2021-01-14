import { CircularProgress, createStyles, Fade, makeStyles, Modal, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../api/user/getUser'
import { ProfileImages } from '../componentes/profile/ProfileImages'
import { ProfileInfo } from '../componentes/profile/ProfileInfo'
import { UserSpecificPosts } from '../componentes/profile/UserSpecificPosts'
import { useFetchReducer } from '../hooks/useFetch'
import { isUser } from '../types/typeguards/User.typeguard'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalRoot: {
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            height: 900,
            width: 1200,
            color: "white",
        }
    })
)

interface IParams {
    userId: string
}

export const ProfilePage: React.FC = () => {
    const classes = useStyles()
    const { userId } = useParams<IParams>()
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [modalImage, setModalImage] = useState<string | null>('')

    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getUser, fetchOptions: userId })

    const handleImageClick = (imageUrl: string | null) => {
        setModalImage(imageUrl)
        setOpenModal(true);
    }

    if (isUser(successData)) {
        return (
            <>
                <ProfileImages user={successData}
                    onClickCoverImage={() => handleImageClick(successData.cover)}
                    onClickProfileImage={() => handleImageClick(successData.profilePicture)}
                />
                <ProfileInfo user={successData} />
                <UserSpecificPosts userId={userId}></UserSpecificPosts>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Fade in={openModal}>
                        <div className={classes.modalRoot}>
                            <img style={{ maxWidth: "90%" }} src={modalImage || "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"}></img>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }

    if (loading) {
        return <CircularProgress></CircularProgress>
    }

    if (errorMessage) {
        return <div>Hubo un error</div>
    }

    return null
}

