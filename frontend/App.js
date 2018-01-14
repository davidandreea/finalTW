import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

class Cupoane extends Component{
    render(){
        let profile = this.props.profile;
    
    return (
      <ListItem
          disabled={true}
          leftAvatar={
            profile.account
              ? <Avatar src={"http://www.amredus.ro/wp-content/uploads/2014/06/voucher-reducere-elefant1.jpg"}/>
              : <Avatar src="http://www.amredus.ro/wp-content/uploads/2014/06/voucher-reducere-elefant1.jpg" />
          }
        >
          Cupon 1
          <br/>
          <FlatButton
            href={"1"}
            target="_blank"
            label="GitHub Link"
            secondary={true}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
    </ListItem>
    )  
    }
}
