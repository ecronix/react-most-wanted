import '@formatjs/intl-relativetimeformat/polyfill'
import LocaleProvider from '../../providers/Locale/Provider'
import React, { Suspense, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { getLocaleMessages } from '../../utils/locale'
import { useConfig } from '../../providers/Config'
import { useLocale } from '../../providers/Locale'
import { useRoutes } from 'react-router-dom'

export const LayoutContent = () => {
  const [messages, setMessages] = useState([])
  const { appConfig } = useConfig()
  const {
    components,
    routes = [],
    containers,
    locale: confLocale,
    getDefaultRoutes,
  } = appConfig || {}
  const { Menu, Loading } = components || {}
  const { locales, onError } = confLocale || {}
  const { LayoutContainer = React.Fragment } = containers || {}
  const defaultRoutes = getDefaultRoutes ? getDefaultRoutes(appConfig) : []
  const { locale } = useLocale()

  useEffect(() => {
    const loadPolyfills = async () => {
      //loadLocalePolyfill(locale)

      for (let i = 0; i < locales.length; i++) {
        const l = locales[i]
        if (l.locale === locale) {
          if (l.loadData) {
            await l.loadData
          }
        }
      }
    }
    loadPolyfills()
  }, [locale, locales])

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getLocaleMessages(locale, locales)
      setMessages(messages)
    }
    loadMessages()
  }, [locale, locales])

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={messages}
      onError={onError}
    >
      <LayoutContainer>
        {Menu && <Menu />}
        <Suspense fallback={<Loading />}>
          {useRoutes([...routes, ...defaultRoutes])}
        </Suspense>
      </LayoutContainer>
    </IntlProvider>
  )
}

export const Layout = () => {
  const { appConfig } = useConfig()
  const { locale } = appConfig || {}
  const { defaultLocale, persistKey } = locale || {}
  return (
    <LocaleProvider defaultLocale={defaultLocale} persistKey={persistKey}>
      <LayoutContent appConfig={appConfig} />
    </LocaleProvider>
  )
}

export default Layout
