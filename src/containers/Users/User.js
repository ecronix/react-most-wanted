import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Activity } from '../../containers/Activity'
import { ResponsiveMenu } from 'material-ui-responsive-menu'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { withRouter } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'
import { withFirebase } from 'firekit-provider'
import FireForm from 'fireform'
import { change, submit } from 'redux-form'
import UserForm from '../../components/Forms/UserForm'
import UserGrants from './UserGrants'
import UserRoles from './UserRoles'
import { Tabs, Tab } from 'material-ui/Tabs'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import { filterSelectors, filterActions } from 'material-ui-filter'

const path='/users'
const form_name='user'

class User extends Component {

  componentWillMount() {
    this.props.watchList('admins')
  }

  handleTabActive = (value) => {
    const { history, uid } = this.props

    history.push(`${path}/edit/${uid}/${value}`)
  }

  handleAdminChange = (e, isInputChecked) => {
    const { firebaseApp, match } = this.props
    const uid=match.params.uid

    if(isInputChecked){
      firebaseApp.database().ref(`/admins/${uid}`).set(true)
    }else{
      firebaseApp.database().ref(`/admins/${uid}`).remove()
    }

  }

  render() {

    const {
      history,
      intl,
      muiTheme,
      match,
      admins,
      editType,
      setFilterIsOpen,
      hasFilters,
      firebaseApp
    } = this.props

    const uid=match.params.uid
    let isAdmin=false

    if(admins!==undefined){
      for (let admin of admins) {
        if(admin.key===uid){
          isAdmin=true
          break
        }
      }
    }

    const menuList = [
      {
        hidden: editType !== 'grants',
        text: intl.formatMessage({id: 'open_filter'}),
        icon: <FontIcon className="material-icons" color={hasFilters?muiTheme.palette.accent1Color:muiTheme.palette.canvasColor}>filter_list</FontIcon>,
        tooltip:intl.formatMessage({id: 'open_filter'}),
        onClick: () => setFilterIsOpen('user_grants', true)
      }
    ]

    return (
      <Activity
        iconStyleRight={{width:'50%'}}
        iconElementRight={
          <div>
            <ResponsiveMenu
              iconMenuColor={muiTheme.palette.canvasColor}
              menuList={menuList}
            />
          </div>
        }

        onBackClick={() => history.push('/users')}
        title={intl.formatMessage({id: 'edit_user'})}>

        <Scrollbar>
          <Tabs
            value={editType}
            onChange={this.handleTabActive}>


            <Tab
              value={'profile'}
              icon={<FontIcon className="material-icons">person</FontIcon>}>
              {
                editType==='profile' &&
                <div style={{margin: 15, display: 'flex', justifyContent: 'center'}}>
                  <FireForm
                    firebaseApp={firebaseApp}
                    name={form_name}
                    path={`${path}/`}
                    onSubmitSuccess={(values)=>{history.push(`${path}`)}}
                    onDelete={(values)=>{history.push(`${path}`)}}
                    uid={uid}>
                    <UserForm
                      handleAdminChange={this.handleAdminChange}
                      isAdmin={isAdmin}
                      {...this.props}
                    />
                  </FireForm>
                </div>
              }

            </Tab>
            <Tab
              value={'roles'}
              icon={<FontIcon className="material-icons">account_box</FontIcon>}>
              {
                editType==='roles' &&
                <UserRoles {...this.props}/>
              }
            </Tab>
            <Tab
              value={'grants'}
              icon={<FontIcon className="material-icons">lock</FontIcon>}>
              {
                editType==='grants' &&
                <UserGrants {...this.props}/>
              }
            </Tab>
          </Tabs>
        </Scrollbar>


      </Activity>
    )
  }
}


User.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  admins: PropTypes.array.isRequired,
}


const mapStateToProps = (state, ownProps) => {
  const { auth, intl, lists, filters } = state
  const { match } = ownProps

  const uid=match.params.uid
  const editType = match.params.editType?match.params.editType:'data'
  const { hasFilters } = filterSelectors.selectFilterProps('user_grants', filters)

  return {
    hasFilters,
    auth,
    uid,
    editType,
    intl,
    admins: lists.admins
  }
}

export default connect(
  mapStateToProps, { setSimpleValue, change, submit, ...filterActions }
)(injectIntl(withRouter(withFirebase(muiThemeable()(User)))))
