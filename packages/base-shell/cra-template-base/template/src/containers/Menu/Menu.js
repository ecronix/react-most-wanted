import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import LocaleContext from 'base-shell/lib/providers/Locale/Context'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import AuthContext from 'base-shell/lib/providers/Auth/Context'

const Menu = () => {
  const intl = useIntl()

  const { setLocale, locale = 'en' } = useContext(LocaleContext)
  const { appConfig } = useContext(ConfigContext)
  const auth = useContext(AuthContext)
  const { menu } = appConfig || {}
  const { getMenuItems } = menu || {}

  const itemsMenu = getMenuItems
    ? getMenuItems({
        intl,
        auth,
        locale,
        updateLocale: setLocale,
      }).filter((item) => {
        return item.visible !== false
      })
    : []

  const getNestedItems = function (hostItem, hostIndex) {
    if (hostItem.nestedItems !== undefined) {
      let nestedItems = hostItem.nestedItems.filter(function (item) {
        return item.visible !== false
      })

      return (
        <ul>
          {nestedItems.map((nestedItem, k) => {
            return (
              <React.Fragment key={k}>
                {hostItem.primaryTogglesNestedList ? (
                  <>
                    <input
                      onChange={(e) => {
                        if (nestedItem.onClick) {
                          nestedItem.onClick()
                        }
                      }}
                      checked={locale === nestedItem.key}
                      type="radio"
                      id={nestedItem.primaryText}
                      name={hostItem.primaryText}
                      value={nestedItem.primaryText}
                    ></input>
                    <label htmlFor={nestedItem.primaryText}>
                      {nestedItem.primaryText}
                    </label>
                    <br />
                  </>
                ) : (
                  <>
                    <li key={k}>{nestedItem.primaryText}</li>
                    {getNestedItems(nestedItem, k)}
                  </>
                )}
              </React.Fragment>
            )
          })}
        </ul>
      )
    }

    return null
  }

  return (
    <div>
      <nav>
        <ul>
          Menu
          {itemsMenu.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <li style={{ listStyleType: item.value ? 'dash' : 'none' }}>
                  {item.value ? (
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      activeStyle={{ background: 'grey', color: 'white' }}
                      to={item.value}
                      onClick={(e) => {
                        if (item.onClick) {
                          item.onClick()
                        }
                      }}
                    >
                      {item.primaryText}
                    </NavLink>
                  ) : (
                    item.primaryText
                  )}
                </li>
                {getNestedItems(item, i)}
              </React.Fragment>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Menu
