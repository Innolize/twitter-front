import { Box, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { LastAccountsContainer } from './LastAccountsContainer'
import { SearchBar } from './SearchBar'

export const FindPeople: React.FC = () => {
    const [searchParam, setSearchParam] = useState<string>("")

    const handleOnSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const currentValue = e.target.value
        setSearchParam(currentValue)
    }

    return (
        <Box style={{ margin: 20 }}>
            <SearchBar
                onChangeSearch={handleOnSearch}
                searchValue={searchParam}
            />
            <Typography variant="h5" align="center">
                {searchParam ? `Results for users with "${searchParam}"` : "Latests users created"}
            </Typography>
            <LastAccountsContainer searchParam={searchParam}></LastAccountsContainer>
        </Box>
    )
}

