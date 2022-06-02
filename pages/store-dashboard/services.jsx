import withGaurd from 'components/hoc/withGaurd'
import React from 'react'

function Services() {
  return (
    <div>Services</div>
  )
}

export default withGaurd(Services)

export async function getStaticProps() {
    return {
        props: {
            isDashboardRoute: true
        }
    }
}