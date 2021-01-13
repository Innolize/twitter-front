import React, { useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { Box, Button, Chip, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
        },
        root: {
            height: 90,
            padding: 10
        },
        margin: {
            margin: 5
        }
    })
)

interface EditProfileButtonsProps {
    newProfileImage: boolean
    newCoverImage: boolean
    newProfileOnCancel: () => void
    newCoverOnCancel: () => void
    onClickCancel: () => void
    onClickSave: () => void
}

export const EditProfileButtons: React.FC<EditProfileButtonsProps> = ({ newCoverImage, newProfileImage, newProfileOnCancel, newCoverOnCancel, onClickCancel, onClickSave }) => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Box className={classes.buttonContainer}>
                <Button variant="outlined" color="secondary" className={classes.margin} onClick={onClickCancel}>
                    Cancel<CancelIcon color="secondary" />
                </Button>
                <Button variant="outlined" color="primary" className={classes.margin} onClick={onClickSave}>
                    Save<SaveIcon color="primary" />
                </Button>
            </Box>
            <Box className={classes.buttonContainer}>
                {newProfileImage && <Chip
                    color="primary"
                    label='new profile image!'
                    icon={<NewReleasesIcon />}
                    onDelete={newProfileOnCancel}
                />}
                {newCoverImage && <Chip
                    color="primary"
                    label='new cover Image!'
                    icon={<NewReleasesIcon />}
                    onDelete={newCoverOnCancel}
                />}

            </Box >

        </Box>
    )
}

