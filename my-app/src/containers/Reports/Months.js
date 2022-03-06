import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useTheme } from '@mui/material/styles'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1
const monthsPath = `/user_registrations_per_month/${currentYear}`

// eslint-disable-next-line
export default function () {
  const intl = useIntl()
  const theme = useTheme()
  const { watchPath, getPath, unwatchPath } = usePaths()
  const months = getPath(monthsPath, {})

  useEffect(() => {
    watchPath(monthsPath)
    return () => {
      unwatchPath(monthsPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let monthsLabels = []
  let monthsData = []

  if (months) {
    Object.keys(months)
      .sort()
      .map((key) => {
        if (parseInt(key) === currentMonth) {
          return key
        }
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
        label: intl.formatMessage({
          id: 'user_registration_graph_label',
          defaultMessage: 'Registered users',
        }),
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

  return (
    <div>
      <Line
        options={{
          maintainAspectRatio: true,
        }}
        data={monthsComponentData}
      />
    </div>
  )
}
