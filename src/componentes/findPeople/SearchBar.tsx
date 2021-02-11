import { Box, TextField } from "@material-ui/core"

interface SearchBarProps {
    onChangeSearch: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    searchValue: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChangeSearch, searchValue }) => {
    return (
        <Box>
            <TextField
                variant="outlined"
                placeholder="Find user"
                type="search"
                fullWidth
                onChange={onChangeSearch}
                value={searchValue}
            >
            </TextField>
        </Box>
    )
}