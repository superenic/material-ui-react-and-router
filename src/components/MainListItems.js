import React from 'react';
import { useHistory } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

function MainListItems() {
  let history = useHistory();

  const link = path => e => {
    history.push(path);
  };

  return (<div>
      <ListItem button onClick={link('/')}>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Inicio"/>
      </ListItem>
      <ListItem button onClick={link('/order')}>
        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button onClick={link('/customer')}>
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button onClick={link('/report')}>
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button onClick={link('/intergration')}>
        <ListItemIcon><LayersIcon /></ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </div>);
};

export default MainListItems;