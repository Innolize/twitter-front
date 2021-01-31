import { Button, Popover } from '@material-ui/core'
import React, { MutableRefObject, useRef, useState } from 'react'
import Picker, { IEmojiData } from 'emoji-picker-react'


interface Props {
    onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, data: IEmojiData) => void
}

export const EmojiButton: React.FC<Props> = ({ onEmojiClick }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [showEmojis, setShowEmojis] = useState<boolean>(false)


    const handleClose = () => {
        setShowEmojis(false);
    };

    const handleOpen = () => {
        setShowEmojis(true)
    }

    return (
        <div>
            <Button ref={buttonRef} onClick={handleOpen}>😀</Button>
            <EmojiPopover anchorEl={buttonRef} isOpen={showEmojis} onClose={handleClose} onEmojiClick={onEmojiClick} ></EmojiPopover>
        </div>
    )
}

interface EmojiPopoverProps {
    anchorEl: MutableRefObject<HTMLButtonElement | null>,
    isOpen: boolean,
    onClose: () => void,
    onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, data: IEmojiData) => void
}

const EmojiPopover: React.FC<EmojiPopoverProps> = ({ anchorEl, onClose, isOpen, onEmojiClick }) => {

    return (

        <Popover
            open={isOpen}
            anchorEl={anchorEl.current}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Picker disableSearchBar disableSkinTonePicker onEmojiClick={onEmojiClick}></Picker>

        </Popover>
    );
}