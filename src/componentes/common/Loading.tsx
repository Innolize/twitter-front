import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

interface Props {
    size?: number,
}

export const Loading: React.FC<Props> = ({ size = 40 }) => {
    return (
        <Box display="flex" justifyContent="center" height="180px" alignItems="center">
            <CircularProgress size={size}></CircularProgress>
        </Box>
    )
}
