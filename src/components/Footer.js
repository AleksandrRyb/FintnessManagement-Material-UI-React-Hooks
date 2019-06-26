import React, {useContext} from 'react';
import {Paper, Tab, Tabs, Grid} from '@material-ui/core';
import {FitnessContext} from '../contex';
import withWidth from '@material-ui/core/withWidth';//this is a HOC we that raps the "Footer" comp and gives the "width" props which indicates current break point value of the screen

const Footer = ({width}) => {
    //console.log('width=',width);
    const context=useContext(FitnessContext);
    const { muscles, footerMenuToSelect}=context;

    return (
        <Paper>
            <Tabs value={footerMenuToSelect}  indicatorColor="primary" textColor="primary" centered={width!=='xs'} scrollButtons="on" variant={width==='xs'? "scrollable":false}>
                <Tab label="All" onClick={()=>context.onSelectHandler(-1)}/>
                {muscles.map((muscle, index)=>{
                    return <Tab label={muscle} key={muscle} onClick={()=>context.onSelectHandler(index)}></Tab>
                })}
            </Tabs>
        </Paper>
    );
};

export default withWidth()(Footer);
