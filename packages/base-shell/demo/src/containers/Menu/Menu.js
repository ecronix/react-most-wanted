import React, { useState } from 'react'
import { logout } from '../../utils/auth'
import { withRouter, NavLink } from 'react-router-dom'
import { default as withAppConfigs } from 'base-shell/lib/providers/ConfigProvider/withConfig'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import { updateLocale } from 'base-shell/lib/store/locale/actions'
const Menu = ({ history, appConfig, intl }) => {

  const [selectedLocale, setLocale] = useState(intl.formatMessage({ id: appConfig.initial_state.locale }))

  const handleSignOut = (user) => {
    logout()
    history.push('/signin');
  }

  const itemsMenu = appConfig.getMenuItems({
    intl,
    auth: appConfig.auth,
    locale: appConfig.initial_state.locale,
    updateLocale,
    handleSignOut
  })
    .filter(item => {
      return item.visible !== false
    })

  const getNestedItems = function (hostItem, hostIndex) {

    if (hostItem.nestedItems !== undefined) {
      let nestedItems = hostItem.nestedItems.filter(function (item) {
        return item.visible !== false
      })

      return (
        <ul>
          {
            nestedItems.map((nestedItem, k) => {
              return (
                <React.Fragment key={k}>
                  {
                    hostItem.primaryTogglesNestedList ?
                      (
                        <>
                          <input onChange={e => {
                            if (nestedItem.onClick) {
                              nestedItem.onClick()
                            }
                            setLocale(e.currentTarget.value);
                            console.log(`change locale to ${nestedItem.primaryText}`, nestedItem.onClick);
                          }} checked={selectedLocale === nestedItem.primaryText} type="radio" id={nestedItem.primaryText} name={hostItem.primaryText} value={nestedItem.primaryText}></input>
                          <label htmlFor={nestedItem.primaryText}>{nestedItem.primaryText}</label><br />
                        </>
                      ) :
                      (
                        <>
                          <li key={k}>
                            {
                              nestedItem.primaryText
                            }
                          </li>
                          {
                            getNestedItems(nestedItem, k)
                          }
                        </>
                      )
                  }
                </React.Fragment>)
            })
          }
        </ul>)
    }

    return null;
  }

  return (
    <div>
      <nav>
        <ul>
          Menu
          {
            itemsMenu.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <li style={{ listStyleType: item.value ? 'dash' : 'none' }}>
                    {
                      item.value ? <NavLink style={{ textDecoration: 'none' }} activeStyle={{ background: 'grey', color: 'white' }} to={item.value}
                        onClick={e => {
                          if (item.onClick) {
                            item.onClick()
                          }
                        }} >{item.primaryText}</NavLink>
                        : item.primaryText
                    }
                  </li>
                  {
                    getNestedItems(item, i)
                  }
                </React.Fragment>
              );
            })
          }
        </ul>
      </nav>
    </div>
  )
}
export default compose(
  injectIntl,
  withRouter,
  withAppConfigs,
)(Menu)