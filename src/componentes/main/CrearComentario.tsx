import { Avatar, Box, Button, createStyles, Input, makeStyles, Theme } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/Photo'
import YouTubeIcon from '@material-ui/icons/YouTube';
import SendIcon from '@material-ui/icons/Send';
import React from 'react'

interface CrearComentarioProps {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            margin: "20px 10px 20px 10px"
        },
        textField: {
            margin: "10px 10px 10px 10px",
            width: "90%"
        },
        root: {
            display: "flex",
            padding: 10,
            margin: 20,
            border: "solid #E1E8ED 1px"
        },
        contenedorMultimedia: {
            flexGrow: 1
        },
        contenedorBotones: {
            display: "flex",
            width: "90%",
            alignItems: "center"
        }
    }),
);

export const CrearComentario: React.FC<CrearComentarioProps> = ({ }) => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Avatar alt="carlitos test" src="https://s6.eestatic.com/2019/11/14/omicrono/Omicrono_444466491_137907739_1706x960.jpg" className={classes.large}></Avatar>
            <Box style={{ width: "90%" }}>
                <Input placeholder="Que querés compartir hoy?" className={classes.textField} />
                <Box className={classes.contenedorBotones} id="contenedor-botones" >
                    <Box style={{ flexGrow: 1 }} id="contenedor-multimedia">
                        <PhotoIcon fontSize="large" />
                        <YouTubeIcon fontSize="large" />
                    </Box>

                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}