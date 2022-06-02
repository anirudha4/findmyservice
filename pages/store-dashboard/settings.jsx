import withGaurd from 'components/hoc/withGaurd'
import React from 'react'

function Settings() {
  return (
    <div>Settings</div>
  )
}

export default withGaurd(Settings)

export async function getStaticProps() {
    return {
        props: {
            isDashboardRoute: true
        }
    }
}