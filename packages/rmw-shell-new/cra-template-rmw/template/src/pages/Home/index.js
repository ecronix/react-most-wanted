import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useEffect } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import CountUp from 'react-countup'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

const currentYear = new Date().getFullYear()
const daysPath = `/user_registrations_per_day/${currentYear}/${new Date()
  .toISOString()
  .slice(5, 7)}`
const monthsPath = `/user_registrations_per_month/${currentYear}`
const providerPath = '/provider_count'

const HomePage = ({ watchList: watchList2 }) => {
  const intl = useIntl()
  const theme = useTheme()
  const { watchPath, getPath, unwatchPath } = usePaths()
  const users_count = getPath('users_count', 0)
  const days = getPath(daysPath, {})
  const months = getPath(monthsPath, {})
  const providers = getPath(providerPath, {})

  useEffect(() => {
    watchPath('users_count')
    watchPath(daysPath)
    watchPath(monthsPath)
    watchPath(providerPath)
    return () => {
      unwatchPath(daysPath)
      unwatchPath(monthsPath)
      unwatchPath(providerPath)
      unwatchPath('users_count')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let daysLabels = []
  let daysData = []

  if (days) {
    Object.keys(days)
      .sort()
      .map((key) => {
        daysLabels.push(key)
        daysData.push(days[key])
        return key
      })
  }

  const daysComponentData = {
    labels: daysLabels,
    datasets: [
      {
        label: intl.formatDate(Date.now(), { month: 'long' }),
        fill: false,
        lineTension: 0.1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: theme.palette.secondary.main,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.primary.main,
        pointHoverBorderColor: theme.palette.secondary.main,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: daysData,
      },
    ],
  }

  let monthsLabels = []
  let monthsData = []

  if (months) {
    Object.keys(months)
      .sort()
      .map((key) => {
        let date = new Date(`${currentYear}-${key}-1`)
        monthsLabels.push(intl.formatDate(date, { month: 'long' }))

        monthsData.push(months[key])
        return key
      })
  }

  const monthsComponentData = {
    labels: monthsLabels,
    datasets: [
      {
        label: intl.formatMessage({ id: 'user_registrationg_graph_label' }),
        fill: false,
        maintainAspectRatio: true,
        lineTension: 0.1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: theme.palette.secondary.main,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: theme.palette.primary.main,
        pointHoverBorderColor: theme.palette.secondary.main,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: monthsData,
      },
    ],
  }

  let providersData = []
  let providersLabels = []
  let providersBackgrounColors = []

  if (providers) {
    Object.keys(providers)
      .sort()
      .map((key) => {
        providersLabels.push(intl.formatMessage({ id: key }))
        providersBackgrounColors.push(
          intl.formatMessage({ id: `${key}_color` })
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
    <Page
      pageTitle={intl.formatMessage({
        id: 'dashboard',
        defaultMessage: 'Dashboard',
      })}
    >
      <Scrollbar
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 18,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: 18,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <Card style={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {intl.formatMessage({
                      id: 'registered_usres',
                      defaultMessage: 'Registered Users:',
                    })}
                  </Typography>
                  <Typography color="primary">
                    <CountUp
                      style={{
                        fontSize: 100,
                      }}
                      start={0}
                      end={users_count}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <div
              style={{ width: '50%', minWidth: 300, height: 400, padding: 9 }}
            >
              <Card>
                <CardContent>
                  <div>
                    <Line
                      options={{
                        maintainAspectRatio: true,
                      }}
                      data={monthsComponentData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div
              style={{ width: '50%', minWidth: 300, height: 400, padding: 9 }}
            >
              <Card>
                <CardContent>
                  <div>
                    <Bar
                      options={{
                        maintainAspectRatio: true,
                      }}
                      data={daysComponentData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div
              style={{ width: '50%', minWidth: 300, height: 400, padding: 9 }}
            >
              <Card>
                <CardContent>
                  <div>
                    <Doughnut data={providersComponentData} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Scrollbar>
    </Page>
  )
}
export default HomePage
