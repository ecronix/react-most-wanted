import React from 'react';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import { Helmet } from 'react-helmet';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const styles={
  container:{
    marginTop: 64,
    height: '100%'
  },
}

export const Activity = ({title, children, onBackClick,  ...rest}) =>  {


  const getIconElementLeft = () => {
    if(onBackClick){
      return <IconButton>
        <FontIcon className="material-icons" >chevron_left</FontIcon>
      </IconButton>
    }else {
      return undefined;
    }
  }

  return (
    <div style={{height:'100%'}}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ResponsiveAppBar
        title={title}
        showMenuIconButton={onBackClick!==undefined?true:undefined}
        onLeftIconButtonTouchTap={onBackClick}
        iconElementLeft={getIconElementLeft()}
        {...rest}
      />
      <div style={styles.container}>
        {children}
      </div>
    </div>
  );

}

export default Activity;
