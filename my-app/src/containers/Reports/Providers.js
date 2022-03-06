import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useTheme } from '@mui/material/styles'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const providerPath = '/provider_count'

const getProviderColor = (provider, defaultColor) => {
  switch (provider) {
    case 'google':
      return '#EA4335'
    case 'phone':
      return '#90A4AE'
    case 'twitter':
      return '#36A2EB'
    case 'facebook':
      return '#303F9F'
    case 'guthub':
      return '#303030'

    default:
      return defaultColor
  }
}

// eslint-disable-next-line
export default function () {
  const intl = useIntl()
  const theme = useTheme()
  const { watchPath, getPath, unwatchPath } = usePaths()
  const providers = getPath(providerPath, {})

  useEffect(() => {
    watchPath(providerPath)
    return () => {
      unwatchPath(providerPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let providersData = []
  let providersLabels = []
  let providersBackgrounColors = []

  if (providers) {
    Object.keys(providers)
      .sort()
      .map((key) => {
        providersLabels.push(intl.formatMessage({ id: key }))
        providersBackgrounColors.push(
          getProviderColor(key, theme.palette.primary.main)
        )
        providersData.push(providers[key])
        return key
      })
  }

  const providersComponentData = {
    labels: providersLabels,
    datasets: [
      {
        data: providersData,
        backgroundColor: providersBackgrounColors,
        hoverBackgroundColor: providersBackgrounColors,
      },
    ],
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '38vh' }}>
        <Doughnut data={providersComponentData} />
      </div>
    </div>
  )
}
