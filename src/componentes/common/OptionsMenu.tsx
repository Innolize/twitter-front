import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";

interface Props {
    self: boolean,
    removeAction?: () => {}
}

export const OptionsMenu: React.FC<Props> = ({ self, removeAction = () => { } }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {self && <MenuItem onClick={removeAction}>Remove</MenuItem>}
                <MenuItem onClick={handleClose}>Unfollow User</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
        </div>
    );
}