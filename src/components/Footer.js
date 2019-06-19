import React from 'react';
import {Paper, Tab, Tabs} from '@material-ui/core';

const Footer = (props) => {


    return (
        <Paper>
            <Tabs value={props.footerMenuToSelect}  indicatorColor="primary" textColor="primary" centered >
                <Tab label="All" onClick={()=>{props.onSelect(-1)}}/>
                {props.muscles.map((muscle, index)=>{
                    return <Tab label={muscle} onClick={()=>{props.onSelect(index)}}></Tab>
                })}
            </Tabs>
        </Paper>
    );
};

export default Footer;
