import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { getUser } from '../api/user/getUser'
import { EditProfileInfo } from '../componentes/profile/editProfile/EditProfileInfo'
import { ProfileImages } from '../componentes/profile/ProfileImages'
import { useFetchReducer } from '../hooks/useFetch'
import { RootState } from '../redux/reducer'
import { isUser } from '../types/typeguards/User.typeguard'
import { EditProfileButtons } from '../componentes/profile/editProfile/EditProfileButtons'
import { updateUser } from '../api/user/updateUser'
import { USER_EDITED } from '../redux/types/AuthActionTypes'
import { CircularProgress } from '@material-ui/core'



interface IParams {
    userId: string
}

export const EditProfilePage: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams<IParams>()

    const user = useSelector((state: RootState) => state.authReducer.user)
    console.log("redux user", user)

    //trae info de usuario de la base de datos y no del store por si el usuario cambio sus datos en otra pestaña

    const { errorMessage, loading, successData } = useFetchReducer({ fetchCallback: getUser, fetchOptions: userId })

    const [newCoverImage, setNewCoverImage] = useState<File | string>("")
    const [newProfileImage, setNewProfileImage] = useState<File | string>("")
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
        setNewCoverImage("")
        coverImageRef.current.value = ""
    }

    const removeProfileUpload = () => {
        setNewProfileImage("")
        profileImageRef.current.value = ""
    }

    const onChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBio(e.target.value)
    }

    const onChangeCoverInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length) {
            setNewCoverImage(files[0])
        }
    }

    const onChangeProfileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length) {
            setNewProfileImage(files[0])
        }
    }

    const saveUser = async () => {
        const myFormData = new FormData()
        myFormData.append('bio', newBio)
        myFormData.append('name', newName)
        myFormData.append('surname', newSurname)
        if (newCoverImage) myFormData.append('cover', newCoverImage)
        if (newProfileImage) myFormData.append('profile', newProfileImage)

        const response = await updateUser(userId, myFormData)
        dispatch({ type: USER_EDITED, payload: response })
        console.log(response)
        history.push(`/main/profile/${userId}`)
    }

    if (userId !== user?._id) {
        return <Redirect to="/"></Redirect>
    }

    if (loading) {
        return <CircularProgress></CircularProgress>
    }

    if (errorMessage.length) {
        console.log(errorMessage)
        return <div>{errorMessage}</div>
    }




    if (isUser(successData)) {
        return (
            <>
                <ProfileImages
                    user={successData}
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
                    onClickSave={saveUser}
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