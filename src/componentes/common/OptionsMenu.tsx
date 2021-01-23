import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useRef, useState } from "react";

export interface OptionMenuAction {
    description: string,
    action: () => void
}

interface Props {
    removeAction?: () => void
    selfActions?: OptionMenuAction[] | null
}

export const OptionsMenu: React.FC<Props> = ({ selfActions }) => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShow(true)
    };

    const handleClose = () => {
        setShow(false)
    };

    return (
        <div>

            <IconButton aria-controls="simple-menu" aria-haspopup="true" ref={buttonRef} onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={buttonRef.current}
                keepMounted
                open={show}
                onClose={handleClose}
            >
                {selfActions && selfActions.map((sAction, i) => <MenuItem onClick={sAction.action} key={i}>{sAction.description}</MenuItem>)}

                <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
        </div>
    );
}