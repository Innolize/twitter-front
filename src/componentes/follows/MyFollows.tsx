import { Paper, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { FollowPosts } from './FollowPosts';
import { UsersFollowed } from './UsersFollowed';

interface Props {

}

const MyFollows: React.FC<Props> = () => {
    const [value, setValue] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, eValue: number) => {
        setValue(eValue)
    }

    return (
        <Paper square>
            <Tabs value={value} variant={'fullWidth'} onChange={handleChange}>
                <Tab label="item1"></Tab>
                <Tab label="item1"></Tab>
            </Tabs>
            {value === 0 && <FollowPosts />}
            {value === 1 && <UsersFollowed />}
        </Paper>
    )
}

export default MyFollows
