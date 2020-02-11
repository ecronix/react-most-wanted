import React from 'react'
import CustomFade from 'rmw-shell/lib/components/CustomFade/CustomFade'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const PagePart = ({ title = 'title', children = null }) => {
  return (
    <div style={{ width: '100%', marginBottom: 100 }}>
      <div style={{ margin: 20 }}>
        <CustomFade>
          <Typography variant="h4" color="secondary">
            {title}
          </Typography>
        </CustomFade>
        <Divider style={{ width: '100%', marginBottom: 50 }} />

        <CustomFade>{children}</CustomFade>
      </div>
    </div>
  )
}

export default PagePart
