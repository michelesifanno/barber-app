import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import ContentCutTwoToneIcon from '@mui/icons-material/ContentCutTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';


function MainListItems() {

  const [open, setOpen] = useState(false);
  const location = useLocation();


  const isActive = (path) => location.pathname === path;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        component={NavLink}
        to="/"
        selected={isActive('/')}
        className={isActive('/') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <SpaceDashboardTwoToneIcon className='iconDashboard'/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/appuntamenti"
        selected={isActive('/appuntamenti')}
        className={isActive('/appuntamenti') ? 'activeNavItem' : ''}
      >
        <ListItemIcon>
          <CalendarTodayTwoToneIcon className='iconDashboard'/>
        </ListItemIcon>
        <ListItemText primary="Appuntamenti" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/clienti"
        selected={isActive('/clienti')}
        className={isActive('/clienti') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <PeopleAltTwoToneIcon className='iconDashboard'/>
        </ListItemIcon>
        <ListItemText primary="Clienti" />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/servizi"
        selected={isActive('/servizi')}
        className={isActive('/servizi') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <ContentCutTwoToneIcon className='iconDashboard'/>
        </ListItemIcon>
        <ListItemText primary="Servizi" sx={{color:'rgba(255, 255, 255, 0.54'}} />
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/report"
        selected={isActive('/report')}
        className={isActive('/report') ? 'activeNavItem' : ''}>
        <ListItemIcon>
          <ArticleTwoToneIcon className='iconDashboard'/>
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItemButton>

    </>
  )
}


export default MainListItems
