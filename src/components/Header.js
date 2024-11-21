import React,{Fragment,useEffect,useState} from 'react' 
import {connect} from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Drawer,AppBar,Toolbar,List,
       ListItem,ListItemIcon,ListItemText,
       Menu,MenuItem,Badge,Fade,
       Divider,IconButton,BottomNavigation,
       BottomNavigationAction,Avatar} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import BuildIcon from '@material-ui/icons/Build';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShopIcon from '@material-ui/icons/Shop';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { MdSpaceDashboard } from "react-icons/md";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RiServiceFill } from "react-icons/ri";
import {Typography} from '@material-ui/core';
import { MdInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { FcManager } from "react-icons/fc";
import { FcFactory } from "react-icons/fc";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdAccountBalanceWallet, MdAdminPanelSettings } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
       
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import NoteIcon from '@material-ui/icons/Note';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HomeIcon from '@material-ui/icons/Home';
import StyleIcon from '@material-ui/icons/Style';
import axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import './global.css'
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import TextField from '@material-ui/core/TextField';


import {APP_URL,API_URL} from '../config.js';
import {accessChecker} from '../lib/functions';
import socketIOClient from "socket.io-client";
import {createdCategorySet,updatedCategorySet,disableRestoreSet,createdBrandSet,updatedBrandSet,brandDisableRestoreSet,
  createdColorSet,updatedColorSet,disableRestoreColorSet,disableRestoreUnitSet,updatedUnitSet,createdUnitSet,
  createdBranchSet,updatedBranchSet,disableRestoreBranchSet,
  createdWarehouseSet,updatedWarehouseSet,disableRestoreWarehouseSet,
  createdAreaSet,updatedAreaSet,disableRestoreAreaSet,
  createdProdNameSet,updatedProdNameSet,disableRestoreProdNameSet,
  createdProductSet,updatedProductSet,productCodeSet,disableRestoreProductSet,customerCodeSet,
  createdMaterialSet,updatedMaterialSet,materialCodeSet,disableRestoreMaterialSet,
  createdCustomerSet,updatedCustomerSet,disableRestoreCustomerSet,
  createdSupplierSet,updatedSupplierSet,disableRestoreSupplierSet,
  createdDesignationSet,updatedDesignationSet,disableRestoreDesignationSet,
  createdDepartmentSet,updatedDepartmentSet,disableRestoreDepartmentSet,
  createdMonthSet,updatedMonthSet,disableRestoreMonthSet,createdEmployeeSet,updatedEmployeeSet,employeeDisableRestoreSet,
  employeeCodeSet,createdTranAccSet,updatedTranAccSet,tranAccDisableRestoreSet,tranAccCodeSet,
  createdBankAccSet,bankAccCodeSet,updatedBankAccSet,
  createdCashTranSet,updatedCashTranSet,cashTranDisableRestoreSet,cashTranCodeSet,
  createdBankTranSet,updatedBankTranSet,bankTranDisableRestoreSet,bankTranCodeSet,
  createdCustomerPaySet,updatedCustomerPaySet,customerPayDisableRestoreSet,
  createdSupplierPaySet,updatedSupplierPaySet,supplierPayDisableRestoreSet,
  createdMaterialNameSet,updatedMaterialNameSet,disableRestoreMaterialNameSet,
} from '../actions/actions';
import swal from 'sweetalert';





const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
  },
  drawerIconColor:{
    color:'rgb(255, 255, 255)'
  },
  linkStyle:{
       textDecoration:'none',
       color:'#484848',
       paddingTop:'4px !important',
       paddingBottom:'4px !important'
  },
  appBar: {
    backgroundColor: "#1A1A1D",
    color:theme.topNavApp.color,
    borderBottom: "1px solid #9CE1E7",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift:{
    backgroundColor:theme.topNavApp.bg,
    color:theme.topNavApp.color,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  cus_botNav: {
    width: '200px',
    height: '100vh',
    position: 'fixed',
    top: '64px',
    right: '0px',
    display: 'flex',
    // flexDirection: 'column',
    flexWrap: 'wrap',
    zIndex: 100000000,
    backgroundColor: "#1a1a1df0 !important"
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background:theme.sidebar,
  },
  drawerOpen: {
    width: drawerWidth,
    background:theme.sidebar,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(0) + 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0) + 0,
    },
  },
  toolbarspace:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  toolbar: {
    backgroundColor:'#E0F7FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  companyTitle:{
    textAlign:'left',
    color: '#568389',
    fontSize: '20px'
  },
  '@global': {

    '.MuiListItem-gutters': {
      paddingLeft: '5px',
      paddingRight: '0px'
  },
   
    '.MuiTableCell-head:last-child':{
         textAlign:'right'
    },
    '.MuiTableCell-head:first-child':{
      textAlign:'left'
 },

 '.MuiAlert-standardSuccess': {
  color: '#ffff !important',
  fontSize: '15px !important',
  backgroundColor: 'green !important',
  fontWeight: 'bold !important'
},
 
    '.MuiTableCell-root':{
      padding:'1px !important'
    },
    '.MuiTypography-h6':{
    'textAlign': 'left',
    'marginLeft': '-22px'
    },
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiBottomNavigation-root': {
      background: 'transparent'
    },
    '.MuiListItem-root':{
      paddingBottom:'1px',
      paddingTop:'1px'
    },
    '.MuiListItemIcon-root':{
      minWidth: '30px'
    },
    'a':{
      textDecoration:'none'
    },
    '.MuiInputBase-input':{
      width:'100% !important'
    },
    '.MuiButton-containedPrimary':{
      backgroundColor:'#188074 !important',
      color: '#005d1f',
      backgroundColor: '#95f3ff'
    },
    '.MuiButton-containedPrimary:hover':{
      backgroundColor:'#188074 !important',
      color: '#005d1f',
      backgroundColor: '#65da63'
    },
    '.MuiOutlinedInput-input': {
      padding: '10.5px 14px !important'
    },
    '.MuiInputLabel-outlined': {
      zIndex: '1',
      transform: 'translate(14px, 13px) scale(1)',
      pointerEvents: 'none'
  },
  '.MuiDrawer-paperAnchorLeft':{
    overflowX: 'hidden'
  },
  '.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
    padding: '0px !important'
}
},
usersettingaction:{
    marginLeft: 0,
    cursor:'pointer',
    marginLeft:'15px',
    marginRight:'15px'
},
whiteSpace:{
    width: '100%',
},
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
})); 
const Header = ({path,menuAction,currentRoute,createdCategorySet,
  updatedCategorySet,disableRestoreSet,createdBrandSet,updatedBrandSet,brandDisableRestoreSet,
  createdColorSet,updatedColorSet,disableRestoreColorSet,createdUnitSet,updatedUnitSet,disableRestoreUnitSet,
  createdBranchSet,updatedBranchSet,disableRestoreBranchSet,createdWarehouseSet,updatedWarehouseSet,disableRestoreWarehouseSet,
  createdAreaSet,updatedAreaSet,disableRestoreAreaSet,
  createdProdNameSet,updatedProdNameSet,disableRestoreProdNameSet,authInfo,
  createdMaterialNameSet,updatedMaterialNameSet,disableRestoreMaterialNameSet,
  createdProductSet,updatedProductSet,productCodeSet,disableRestoreProductSet,customerCodeSet,
  createdCustomerSet,updatedCustomerSet,disableRestoreCustomerSet,
  createdSupplierSet,updatedSupplierSet,disableRestoreSupplierSet,
  createdDesignationSet,updatedDesignationSet,disableRestoreDesignationSet,
  createdDepartmentSet,updatedDepartmentSet,disableRestoreDepartmentSet,
  createdMonthSet,updatedMonthSet,disableRestoreMonthSet,
  createdEmployeeSet,updatedEmployeeSet,employeeDisableRestoreSet,
  employeeCodeSet,
  createdTranAccSet,updatedTranAccSet,tranAccDisableRestoreSet,tranAccCodeSet,
  createdBankAccSet,bankAccCodeSet,
  createdCashTranSet,updatedCashTranSet,cashTranDisableRestoreSet,cashTranCodeSet,
  createdBankTranSet,updatedBankTranSet,bankTranDisableRestoreSet,bankTranCodeSet,
  createdCustomerPaySet,updatedCustomerPaySet,customerPayDisableRestoreSet,
  createdSupplierPaySet,updatedSupplierPaySet,supplierPayDisableRestoreSet,
  createdMaterialSet,updatedMaterialSet,materialCodeSet,disableRestoreMaterialSet,


})=>{
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [value, setValue] = React.useState(0);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openusersetting = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    const [branchSwitch, branchSwitchSet] = React.useState(false);
    const [branches, branchesSet] = React.useState([]);
    const [selectedBranch, selectedBranchSet] = React.useState(null);
    const [user_password,user_password_set] = React.useState('');
    let [ajaxReqStatus,ajaxReqStatusSet] = useState(false);
    const [isMenuOpen,setIsMenuOpen] = useState(false)

  
   

  
  const logout = ()=>{
    sessionStorage.clear();
        window.location.href = `${APP_URL}`
  }
  
   
  useEffect(()=>{ 
    const socket = socketIOClient(API_URL); 

    
    socket.on("accessChanged", (data) => {
          console.log(authInfo.userInfo.user_id,' -- ',data.user_id)
         if(data.access=='changed' && (authInfo.userInfo.user_id == data.user_id)){
          swal({
            title:data.msg,
            icon:'warning',

          }).then(res=>{
            if(res){
              logout()
            }else{
              logout()
            }
          })
           
          
         }
    });



   


     // Supplier payments  
    socket.on("createdSupplierPay", (data) => {
      createdSupplierPaySet(data)
    });
    
    socket.on("updatedSupplierPay", (data) => {
      updatedSupplierPaySet(data)
    });
     socket.on("disableRestoreSupplierPay", (data) => {
      supplierPayDisableRestoreSet(data); 
     });


    // Bank Accounts time 
    socket.on("createdBankAcc", (data) => {
      createdBankAccSet(data)
    });

   
    
   
    
     socket.on("bankAccCode", (data) => {
      bankAccCodeSet(data); 
    });

    socket.on("updatedBankAcc", (data) => {
      updatedBankAccSet(data)
    });

    
    // Transaction Accounts real time 
    socket.on("createdTranAcc", (data) => {
      createdTranAccSet(data)
    });
    
    socket.on("updatedTranAcc", (data) => {
      updatedTranAccSet(data)
    });
     socket.on("disableRestoreTranAcc", (data) => {
      tranAccDisableRestoreSet(data); 
     });
     

     socket.on("disableRestoreCashTranAcc", (data) => {
      cashTranDisableRestoreSet(data); 
     });
     
     
     socket.on("tranAccCode", (data) => {
      tranAccCodeSet(data); 
    });
    //  category real time
    socket.on("createdCategory", (data) => {
      createdCategorySet(data)
    });
    
    socket.on("updatedCategory", (data) => {
      updatedCategorySet(data)
    });
     socket.on("disableRestoreCategory", (data) => {
       disableRestoreSet(data); 
     });
       //  Employee real time
       socket.on("createdEmployee", (data) => {
        createdEmployeeSet(data); 
      });
      socket.on("updatedEmployee", (data) => {
        updatedEmployeeSet(data); 
      });
      socket.on("disableRestoreEmployee", (data) => {
        employeeDisableRestoreSet(data); 
      });
      socket.on("employeeCode", (data) => {
        employeeCodeSet(data); 
      });
     //  Brand real time
     socket.on("createdBrand", (data) => {
      createdBrandSet(data); 
    });
    socket.on("updatedBrand", (data) => {
      updatedBrandSet(data); 
    });
    socket.on("disableRestoreBrand", (data) => {
      brandDisableRestoreSet(data); 
    });
    // Color real time
    socket.on("createdColor", (data) => {
      createdColorSet(data); 
    });
    socket.on("updatedColor", (data) => {
      updatedColorSet(data); 
    });
    socket.on("disableRestoreColor", (data) => {
      disableRestoreColorSet(data); 
    });
    // Unit real time
    socket.on("createdUnit", (data) => {
      createdUnitSet(data); 
    });
    socket.on("updatedUnit", (data) => {
      updatedUnitSet(data); 
    });
    socket.on("disableRestoreUnit", (data) => {
      disableRestoreUnitSet(data); 
    });
    // Branch real time
    socket.on("createdBranch", (data) => {
      createdBranchSet(data); 
    });
    socket.on("updatedBranch", (data) => {
      updatedBranchSet(data); 
    });
    socket.on("disableRestoreBranch", (data) => {
      disableRestoreBranchSet(data); 
    });
    // Warehouse real time
    socket.on("createdWarehouse", (data) => {
      createdWarehouseSet(data); 
    });
    socket.on("updatedWarehouse", (data) => {
      updatedWarehouseSet(data); 
    });
    socket.on("disableRestoreWarehouse", (data) => {
      disableRestoreWarehouseSet(data); 
    });
     // Area real time
     socket.on("createdArea", (data) => {
      createdAreaSet(data); 
    });
    socket.on("updatedArea", (data) => {
      updatedAreaSet(data); 
    });
    socket.on("disableRestoreArea", (data) => {
      disableRestoreAreaSet(data); 
    });
     // Product name real time
     socket.on("createdProdName", (data) => {
      createdProdNameSet(data); 
    });
    socket.on("updatedPordName", (data) => {
      updatedProdNameSet(data); 
    });
    socket.on("disableRestoreProdName", (data) => {
      disableRestoreProdNameSet(data); 
    });

     // Product name real time
     socket.on("createdMaterialName", (data) => {
      createdMaterialNameSet(data); 
    });
    socket.on("updatedMaterialName", (data) => {
      updatedMaterialNameSet(data); 
    });
    socket.on("disableRestoreMaterialName", (data) => {
      disableRestoreMaterialNameSet(data); 
    });


     // Supplier name real time
     socket.on("createdSupplier", (data) => {
      createdSupplierSet(data); 
    });
    socket.on("updatedSupplier", (data) => {
      updatedSupplierSet(data); 
    });
    socket.on("disableRestoreSupplier", (data) => {
      disableRestoreSupplierSet(data); 
    });
     
    


    // Month name real time
     socket.on("createdMonth", (data) => {
      createdMonthSet(data); 
    });
    socket.on("updatedMonth", (data) => {
      updatedMonthSet(data); 
    });
    socket.on("disableRestoreMonth", (data) => {
      disableRestoreMonthSet(data); 
    });
     // Department name real time
     socket.on("createdDepartment", (data) => {
      createdDepartmentSet(data); 
    });
    socket.on("updatedDepartment", (data) => {
      updatedDepartmentSet(data); 
    });
    socket.on("disableRestoreDepartment", (data) => {
      disableRestoreDepartmentSet(data); 
    });
    // Designation  real time
    socket.on("createdDesignation", (data) => {
      createdDesignationSet(data); 
    });
    socket.on("updatedDesignation", (data) => {
      updatedDesignationSet(data); 
    });
    socket.on("disableRestoreDesignation", (data) => {
      disableRestoreDesignationSet(data); 
    });
     // customer name real time
     socket.on("createdCustomer", (data) => {
      createdCustomerSet(data); 
    });
    socket.on("updatedCustomer", (data) => {
      updatedCustomerSet(data); 
    });
    socket.on("disableRestoreCustomer", (data) => {
      disableRestoreCustomerSet(data); 
    });
     // Cash transaction real time
     socket.on("createdCashTran", (data) => {
      createdCashTranSet(data); 
    });
    socket.on("updatedCashTran", (data) => {
      updatedCashTranSet(data); 
    });
    socket.on("cashTranDisableRestoreSet", (data) => {
      cashTranDisableRestoreSet(data); 
    });
    // Bank transaction real time
    socket.on("createdBankTran", (data) => {
      createdBankTranSet(data); 
    });
    socket.on("updatedBankTran", (data) => {
      updatedBankTranSet(data); 
    });
    socket.on("bankTranDisableRestoreSet", (data) => {
      bankTranDisableRestoreSet(data); 
    });
    socket.on("bankTranCode", (data) => {
      bankTranCodeSet(data); 
    });
    // Product real time
    socket.on("createdProduct", (data) => { 
      createdProductSet(data); 
    });
    socket.on("updatedProduct", (data) => {
      updatedProductSet(data); 
    });
    socket.on("customerCode", (data) => {
      customerCodeSet(data); 
    });
    socket.on("productCode", (data) => {
      productCodeSet(data); 
    });
    socket.on("disableRestoreProduct", (data) => {
      disableRestoreProductSet(data); 
    });


    //  Material 

    socket.on("createdMaterial", (data) => { 
    
      createdMaterialSet(data); 
    });
    socket.on("updatedMaterial", (data) => {
      updatedMaterialSet(data); 
    });
    socket.on("materialCode", (data) => {
      materialCodeSet(data); 
    });
   
    socket.on("disableRestoreMaterial", (data) => {
      disableRestoreMaterialSet(data); 
    });



    //


    socket.on("createdCustomerPay", (data) => {
      createdCustomerPaySet(data); 
    });
    socket.on("updatedCustomerPay", (data) => {
      updatedCustomerPaySet(data); 
    });
     
    socket.on("disableRestoreCustomerPay", (data) => {
      customerPayDisableRestoreSet(data); 
    });

    getBranches()

  },[]);






  let actionToSwitch = async ()=>{
    if(selectedBranch==null){
     swal({
       title:'Select a Switching Branch',
       icon:'warning'
     })
    }else if(user_password.trim()==''){
     swal({
       title:'Your current account password is Required.',
       icon:'warning'
     })
    }else{
     ajaxReqStatusSet(true)
     let new_branch_id = selectedBranch.branch_id;
     let new_branch_name = selectedBranch.branch_name;
     await axios.post(`${API_URL}/api/switch-branch`,{user_password,new_branch_id,new_branch_name},{headers:{'auth-token':authInfo.token}}).then(res=>{
       ajaxReqStatusSet(false)
      //  return false
       if(res.data.error==false){
        sessionStorage.setItem('auth_info',JSON.stringify(res.data));
        
       window.location.reload()
       }else{
          swal({
               title:`${res.data.message}`,
               icon:'warning'
         })
       }
       })

    }
}





  let getBranches = async ()=>{
      await axios.post(`${API_URL}/api/get-branches`,null,{headers:{'auth-token':authInfo.token}}).then((res)=>{
       let data = res.data.message 
      //  data.unshift({branch_name:'All Branch',branch_id:0})
       branchesSet(data);
 
      })
  }
 
 
 

  return (
      <div  className="app-gap">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }) + 'w-screen bg-black'}
        style={{paddingLeft: '30px', paddingRight: '30px'}}
      >

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%'}}>
          <Link to='/' ><h1 style={{color: '#FCF596'}}>Micron Brain Tech</h1></Link>

            <Toolbar>
                
            <div className={classes.root,classes.usersettingaction} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar>{ authInfo.userInfo.user_full_name.substring(0,1)  } </Avatar>
          </div> 
            <IconButton style={{display:'none'}} aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
          </IconButton>
              <IconButton
                color="#ffffff"
                aria-label="open drawer"
                onClick={e => setIsMenuOpen(!isMenuOpen)}
                edge="start"
                className={clsx(classes.menuButton, {
            
                })}
                style={{color: "#FCF596", height: '40px !important',fontSize: '40px'}}
              >
                <MenuIcon />
              </IconButton>


          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={openusersetting}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>


          {
            isMenuOpen && (
              <div className='w-[200px] h-full fixed top-[70px] right-0 bg-black z-[20000]'>
                      <BottomNavigation
            value={value}
            className={classes.Mui, classes.cus_botNav}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
          >





      <BottomNavigationAction component={Link} to="/"  label="Dashboard" style={{color:'#0F7E77',fontSize:'2rem'}} icon={<MdSpaceDashboard style={{fontSize:'2rem'}} />} />
      <BottomNavigationAction {...(path=='sales'? '':'')}   component={Link}
            to="/sales"   label="Sales" style={{color:'#5F8407'}}  icon={<FaShop style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/service"  label="Service" style={{color:'#50A510'}} icon={<RiServiceFill style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/purchase"  label="Purchase" style={{color:'#9C7200'}} icon={<BiSolidPurchaseTag style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/production"  label="Manufacturing" style={{color:'#00899a'}} icon={<FcFactory style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/stock" label="Inventory" style={{color:'#3E8D54'}} icon={<MdInventory style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/accounts" label="Accounts" style={{color:'#0F7E77'}} icon={<MdAccountBalanceWallet style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/hrpayroll" label="HR&Payroll" style={{color:'#009C8B'}} icon={<FcManager style={{fontSize:'2rem'}}/>} />
      <BottomNavigationAction component={Link} to="/reports" label="Reports" style={{color:'#FF0000'}} icon={<BiSolidReport style={{fontSize:'2rem'}}/>} />

      <BottomNavigationAction component={Link} to="/administration" label="administration"  
      style={{color:'#00691D'}} icon={<MdAdminPanelSettings style={{fontSize:'2rem'}}/>} />

      


      {
        authInfo.role=='super_admin'?(<span>
            <BottomNavigationAction component={Link} to="#" onClick={()=>branchSwitchSet(true)} label="Switch"  
      style={{color:'#00691D'}} icon={<SettingsIcon style={{fontSize:'2rem'}}/>} />
        </span>):''
      }


          </BottomNavigation> 
              </div>
            )
          }
            </Toolbar>           
        </div>
          

      </AppBar>
      
    {/* Switch Branch  Modal */}
     <Modal
        open={branchSwitch}
        onClose={() => branchSwitchSet(false)}
        center
        style={{minWidth:'300px',minHeight:'500px'}}
 
      
      >
        <Grid item xs={12} sm={12}  > 
         
        <Autocomplete
                
                style={{ width: '100%',padding:'10px' }}
                options={branches} 
                size="small"
               
                getOptionLabel={(option) =>option.branch_name}
               
                value={selectedBranch}
                onChange={(event,selectedObj)=>{
                  selectedBranchSet(selectedObj)
                }}
                renderInput={(params) => (
                    <TextField
                    
                    {...params}
                    type="text"
                    autoComplete="off"
                    label="Switch a Branch"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        endAdornment: (
                          <React.Fragment>
                            {/* {areas.length==0 ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment} */}
                          </React.Fragment>
                        ),
                    }}
                    />
                )}
                />



<Grid item xs={12} sm={12} style={{marginTop:'6px',marginLeft:'10px'}} > 
            <TextField   type="text" autoComplete="off"  className={classes.fullWidth}  value={user_password} 
            label="Enter your  password" name="user_password" style={{color:'#222'}}  variant="outlined" size="small"  onChange={(e)=>user_password_set(e.target.value)}
           
            />
            
            </Grid>




          <Button style={{marginTop: '25px'}}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon/>}
            onClick={()=>actionToSwitch()}
        >
        Switch To Branch
      </Button>



         
        </Grid>


        
      </Modal>

      </div>
      
  )
}
function mapStateToProps(state){
      return {
          currentRoute:state.currentRouteReducer,
          authInfo:state.authInfoReducer
      }
}
export default connect(mapStateToProps,{updatedCategorySet,createdCategorySet,disableRestoreSet,
  createdBrandSet,updatedBrandSet,brandDisableRestoreSet,
  createdColorSet,updatedColorSet,disableRestoreColorSet,createdUnitSet,updatedUnitSet,disableRestoreUnitSet,
  createdBranchSet,updatedBranchSet,disableRestoreBranchSet,
  createdWarehouseSet,updatedWarehouseSet,disableRestoreWarehouseSet,
  createdAreaSet,updatedAreaSet,disableRestoreAreaSet,
  createdProdNameSet,updatedProdNameSet,disableRestoreProdNameSet,
  createdProductSet,updatedProductSet,productCodeSet,disableRestoreProductSet,customerCodeSet,
  createdCustomerSet,updatedCustomerSet,disableRestoreCustomerSet,
  createdSupplierSet,updatedSupplierSet,disableRestoreSupplierSet,
  createdDesignationSet,updatedDesignationSet,disableRestoreDesignationSet,
  createdDepartmentSet,updatedDepartmentSet,disableRestoreDepartmentSet,
  createdMonthSet,updatedMonthSet,disableRestoreMonthSet,
  createdEmployeeSet,updatedEmployeeSet,employeeDisableRestoreSet,employeeCodeSet,
  createdTranAccSet,updatedTranAccSet,tranAccDisableRestoreSet,tranAccCodeSet,
  createdBankAccSet,bankAccCodeSet,updatedBankAccSet,
  createdCashTranSet,updatedCashTranSet,cashTranDisableRestoreSet,cashTranCodeSet,
  createdBankTranSet,updatedBankTranSet,bankTranDisableRestoreSet,bankTranCodeSet,
  createdCustomerPaySet,updatedCustomerPaySet,customerPayDisableRestoreSet,
  createdSupplierPaySet,updatedSupplierPaySet,supplierPayDisableRestoreSet,
  createdMaterialNameSet,updatedMaterialNameSet,disableRestoreMaterialNameSet,
  createdMaterialSet,updatedMaterialSet,materialCodeSet,disableRestoreMaterialSet,
})(Header)