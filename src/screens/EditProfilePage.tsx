import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { getUser } from '../api/user/getUser'

import { EditProfileInfo } from '../componentes/profile/editProfile/EditProfileInfo'
import { ProfileImages } from '../componentes/profile/ProfileImages'
import { useFetchReducer } from '../hooks/useFetch'
import { RootState } from '../redux/reducer'
import { isUser } from '../types/typeguards/User.typeguard'
import { EditProfileButtons } from '../componentes/profile/editProfile/EditProfileButtons'



interface IParams {
    userId: string
}

export const EditProfilePage: React.FC = () => {
    const history = useHistory()
    const { userId } = useParams<IParams>()

    const user = useSelector((state: RootState) => state.authReducer.user)

    //trae info de usuario de la base de datos y no del store por si el usuario cambio sus datos en otra pestaña

    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getUser, fetchOptions: userId })

    const [newCoverImage, setNewCoverImage] = useState<File | undefined>()
    const [newProfileImage, setNewProfileImage] = useState<File | undefined>()
    const [newBio, setNewBio] = useState<string>("")
    const [newName, setNewName] = useState<string>("")
    const [newSurname, setNewSurname] = useState<string>("")

    useEffect(() => {
        if (isUser(successData)) {
            setNewBio(successData.bio)
            setNewName(successData.name)
            setNewSurname(successData.surname)
        }
    }, [successData])

    const coverImageRef = useRef() as MutableRefObject<HTMLInputElement>
    const profileImageRef = useRef() as MutableRefObject<HTMLInputElement>


    const removeCoverUpload = () => {
        setNewCoverImage(undefined)
    }

    const removeProfileUpload = () => {
        setNewProfileImage(undefined)
    }

    const onChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBio(e.target.value)
    }

    const onChangeCoverInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCoverImage(e.target.files?.[0])
    }

    const onChangeProfileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCoverImage(e.target.files?.[0])
    }

    if (userId !== user?._id) {
        return <Redirect to="/"></Redirect>
    }


    if (isUser(successData)) {


        return (
            <>
                <ProfileImages
                    user={user}
                    edit={true}
                    onClickCoverImage={() => coverImageRef.current.click()}
                    onClickProfileImage={() => profileImageRef.current.click()}
                />
                <EditProfileButtons
                    newCoverImage={!!newCoverImage}
                    newProfileImage={!!newProfileImage}
                    newCoverOnCancel={removeCoverUpload}
                    newProfileOnCancel={removeProfileUpload}
                    onClickCancel={
                        () => history.push(`/main/profile/${userId}`)
                    }
                    onClickSave={() => { }}
                />
                <EditProfileInfo
                    name={newName}
                    surname={newSurname}
                    bio={newBio}
                    nameOnChange={(e) => setNewName(e.target.value)}
                    surnameOnChange={(e) => setNewSurname(e.target.value)}
                    onChangeBio={onChangeBio}
                />
                <HiddenInput
                    customRef={coverImageRef}
                    inputOnChange={onChangeCoverInput}
                    id="cover-image"
                />
                <HiddenInput
                    customRef={profileImageRef}
                    inputOnChange={onChangeProfileInput}
                    id="profile-image"
                />
            </>
        )
    }

    return null
}

interface HiddenInputProps {
    customRef: React.RefObject<HTMLInputElement>
    inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    id: string
}

const HiddenInput: React.FC<HiddenInputProps> = ({ customRef, inputOnChange, id }) => {
    return (
        <input type="file" style={{ display: 'none' }} id={id} ref={customRef} onChange={inputOnChange}></input>
    )
}