import React  from 'react'
import FontIcon from 'material-ui/FontIcon'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { fade } from 'material-ui/utils/colorManipulator'
import { injectIntl } from 'react-intl'
import TextField from 'material-ui/TextField'

const SearchField = ({ onChange, hintText, muiTheme, intl }) => {

  return (
    <div style={{
      display: 'inline-block',
      backgroundColor: '#fff',
      borderRadius: 5,
      width: 600,
      maxWidth: '100%'
    }}
    >
      <div style={{
        display: 'flex',
        backgroundColor: fade(muiTheme.palette.primary1Color, 0.70),
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10
      }}
      >
        <FontIcon style={{marginLeft: 10, marginTop: 12, marginRight: 15}} className="material-icons" color={muiTheme.palette.textColor}>search</FontIcon>
        <TextField
          style={{width: '100%'}}
          underlineShow={false}
          onChange={onChange}
          hintText={hintText?hintText:intl.formatMessage({id: 'search'})}
        />
      </div>
    </div>
  )
}

export default injectIntl(muiThemeable()(SearchField))
