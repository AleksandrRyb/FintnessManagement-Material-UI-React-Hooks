import React from 'react';
import {Paper, Tab, Tabs} from '@material-ui/core';

const Footer = ({muscles}) => {

    const handleChange=()=>{

    };

    return (
        <Paper>
            <Tabs value={0} onChange={handleChange} indicatorColor="primary" textColor="primary" centered >
                <Tab label="All"/>
                {muscles.map(muscle=>{
                    return <Tab label={muscle}/>
                })}
            </Tabs>
        </Paper>
    );
};

export default Footer;
