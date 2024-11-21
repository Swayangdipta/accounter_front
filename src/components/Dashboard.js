import React,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux';
import {currentRouteSet} from '../actions/actions';
import {pathSpliter} from '../lib/functions';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {APP_URL,API_URL} from '../config.js';
import './global.css'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { RiServiceFill } from "react-icons/ri";
import {Typography} from '@material-ui/core';
import { MdInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { FcManager } from "react-icons/fc";
import { FcFactory } from "react-icons/fc";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdAccountBalanceWallet, MdAdminPanelSettings } from "react-icons/md";
import { FaShop } from "react-icons/fa6";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  box:{
    color: '#e1f8fb',
    height: '177px',
    margin: '0px',
    background: '#23B7A7',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '10px',
    marginTop: '10px',
    width: '23%',
    margin: '1%'
  },
  
  boxTitle:{
    color: '#484848',
    fontWeight:'bold',
    fontSize:'18px',
    margin:'0px'
  },
  '@global': {
    '.MuiBox-root':{
      paddingBottom:'0px !important',
      paddingTop: '20px'
    },
    '.MuiBox-root p':{
      color:'white'
    },
    '.MuiBox-root svg':{
      color:'white',
      fontWidth:'bold'
    }
  }
}));

const logout = ()=>{
  sessionStorage.clear();
  window.location.href = `${APP_URL}`
}

const Dashboard = ({location,currentRoute,currentRouteSet,authInfo})=>{
  useEffect(()=>{
      currentRouteSet(pathSpliter(location.pathname,1))
  },[]);
  
  const classes = useStyles();
  return(
    <>
    <h2 class="soft-title">Account Management Software</h2>



     {
         currentRoute==undefined?( 
                <div style={{padding:'20px'}}>
              <div className="modules-box" style={{marginTop: '65px'}}>
            
             
                <div  className="module-box">
                <Link to="/sales">
                    <Box   p={4}  >
                        <FaShop  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: 'rgb(95 132 7)'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: 'rgb(95 132 7)'}}>Sales Module</p>
                    </Box>
                  </Link>
                </div>

                <div   className="module-box">
                <Link to="/service">
                    <Box   p={4}  >
                        <RiServiceFill  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: 'rgb(80 165 16)'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: 'rgb(80 165 16)'}}>Service Module</p>
                    </Box>
                  </Link>
                </div>



                <div   className="module-box">
                <Link to="/purchase">
                    <Box   p={4}  >
                        <BiSolidPurchaseTag  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: 'rgb(175 128 0)'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: 'rgb(175 128 0)'}}>Purchase Module</p>
                    </Box>
                  </Link>
                </div>


                <div   className="module-box">
                <Link to="/production">
                    <Box   p={4}  >
                        <FcFactory  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: '#0C717D'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: '#0C717D'}}>Manufacturing  Module</p> 
                    </Box>
                  </Link>
                </div>
                


                <div   className="module-box">
                <Link to="/stock">
                    <Box   p={4}  >
                        <MdInventory  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: '#0D8C30'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: '#0D8C30'}}>Inventory  Module</p>
                    </Box>
                  </Link>
                </div>

                <div   className="module-box">
                <Link to="/accounts">
                    <Box   p={4}  >
                        <MdAccountBalanceWallet  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: '#1e8f9c'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: '#1e8f9c'}}>Financial Accounts Module</p>
                    </Box>
                  </Link>
                </div>
               
               

                <div   className="module-box">
                <Link to="/hrpayroll">
                    <Box   p={4}  >
                        <FcManager  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: '#0f7e77'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: '#0f7e77'}}>HR & Payroll Module</p>
                    </Box>
                  </Link>
                </div>

                <div   className="module-box">
                <Link to="/reports">
                    <Box   p={4}  >
                        <BiSolidReport  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: '#7D1C1C'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: '#7D1C1C'}}>Reports Module</p>
                    </Box>
                  </Link>
                </div>

                
                <div   className="module-box">
                <Link to="/administration">
                    <Box   p={4}  >
                        <MdAdminPanelSettings  style={{textAlign: 'center',fontSize: '70px',    marginTop: '14px', color: 'rgb(0 105 29)'}} /><br/>
                        <p  className={classes.boxTitle} style={{color: 'rgb(0 105 29)'}}>Administration </p>
                    </Box>
                  </Link>
                </div>
               

                </div>
                </div>
              ):''
            }
  </>
  )
}
const mapStateToProps = (state)=>{
  return{
    currentRoute:state.returnReducer,
    authInfo:state.authInfoReducer
  }
}
export default connect(mapStateToProps,{currentRouteSet})(Dashboard)