import React from 'react';
import {Paper, Tab, Tabs} from '@material-ui/core';

const Footer = (props) => {
    const handleChange=()=>{

    }
    return (
        <Paper>
            <Tabs
                value={1}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
        </Paper>
    );
};

export default Footer;
