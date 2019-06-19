import React, {useContext} from 'react';
import {Paper, Tab, Tabs} from '@material-ui/core';
import {FitnessContext} from '../contex';

const Footer = (props) => {

    const context=useContext(FitnessContext);
    const { muscles, footerMenuToSelect}=context;

    return (
        <Paper>
            <Tabs value={footerMenuToSelect}  indicatorColor="primary" textColor="primary" centered >
                <Tab label="All" onClick={()=>context.onSelectHandler(-1)}/>
                {muscles.map((muscle, index)=>{
                    return <Tab label={muscle} onClick={()=>context.onSelectHandler(index)}></Tab>
                })}
            </Tabs>
        </Paper>
    );
};

export default Footer;
