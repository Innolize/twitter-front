import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/alert';
import { useState } from 'react';


export interface Props {
    open: boolean;
    severity: "error" | "success" | "info" | "warning",
    message: string
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const PositionedSnackbar: React.FC<Props> = ({ open, severity, message }) => {
    const [state, setState] = useState({
        open: open,
        vertical: 'top',
        horizontal: 'center',
    });

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={4000}
            open={state.open}
            onClose={handleClose}
            message="I love snacks"
            key={state.vertical + state.horizontal}
        >
            <Alert onClose={handleClose} severity={severity}>{message}</Alert>
        </Snackbar>
    )
}