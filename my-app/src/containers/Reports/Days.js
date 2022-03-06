import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useTheme } from '@mui/material/styles'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const daysPath = `/user_registrations_per_day/${currentYear}/${new Date()
  .toISOString()
  .slice(5, 7)}`

// eslint-disable-next-line
export default function () {
  const intl = useIntl()
  const theme = useTheme()
  const { watchPath, getPath, unwatchPath } = usePaths()
  const days = getPath(daysPath, {})

  useEffect(() => {
    watchPath(daysPath)
    return () => {
      unwatchPath(daysPath)
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

  return (
    <div>
      <Bar
        options={{
          maintainAspectRatio: true,
        }}
        data={daysComponentData}
      />
    </div>
  )
}
