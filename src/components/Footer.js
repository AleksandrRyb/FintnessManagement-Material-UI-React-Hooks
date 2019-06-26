import React, {useContext} from 'react';
import {AppBar, Paper, Tab, Tabs} from '@material-ui/core';
import {FitnessContext} from '../contex';
import withWidth from '@material-ui/core/withWidth';//this is a HOC we that raps the "Footer" comp and gives the "width" props which indicates current break point value of the screen

const Footer = ({width}) => {
    //console.log('width=',width);
    const context=useContext(FitnessContext);
    const { muscles, footerMenuToSelect}=context;

    return (
        <Paper>
            <Tabs value={footerMenuToSelect} indicatorColor="primary" textColor="primary" centered={width!=='xs'} scrollButtons="on" variant={width==='xs'? "scrollable":false}>
                <Tab label={<b>All</b>} textColor="secondary" onClick={()=>context.onSelectHandler(-1)}/>
                {muscles.map((muscle, index)=>{
                    return <Tab label={<b>{muscle}</b>} textColor="secondary" key={muscle} onClick={()=>context.onSelectHandler(index)}></Tab>
                })}
            </Tabs>
        </Paper>
    );
};

export default withWidth()(Footer);
