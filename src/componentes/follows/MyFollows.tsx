import { createStyles, makeStyles, Paper, Tab, Tabs, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { FollowPosts } from './FollowPosts';
import { UsersFollowed } from './UsersFollowed';

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        tab: {
            fontWeight: "bold"
        }
    })
))

const MyFollows: React.FC = () => {
    const classes = useStyles()
    const [value, setValue] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, eValue: number) => {
        setValue(eValue)
    }

    return (
        <Paper square>
            <Tabs indicatorColor="primary" value={value} variant={'fullWidth'} onChange={handleChange}>
                <Tab className={classes.tab} label="Follow Posts"></Tab>
                <Tab className={classes.tab} label="Follow Users"></Tab>
            </Tabs>
            {value === 0 && <FollowPosts />}
            {value === 1 && <UsersFollowed />}
        </Paper>
    )
}

export default MyFollows
