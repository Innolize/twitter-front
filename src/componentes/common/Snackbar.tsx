import Snackbar from '@material-ui/core/Snackbar';
import { Alert as MuiAlert, AlertProps } from '@material-ui/lab';

export interface Props {
    open: boolean;
    severity: "error" | "success" | "info" | "warning",
    message: string
    onCloseAction: () => void
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const PositionedSnackbar: React.FC<Props> = ({ open, severity, message, onCloseAction }) => {

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={4000}
            open={open}
            onClose={onCloseAction}
        >
            <Alert onClose={onCloseAction} severity={severity}>{message}</Alert>
        </Snackbar>
    )
}