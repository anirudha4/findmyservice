import withGaurd from 'components/hoc/withGaurd'
import React from 'react'

function Create() {
  return (
    <div>Create</div>
  )
}

export default withGaurd(Create)

export async function getStaticProps() {
  return {
    props: {
      isDashboardRoute: true
    }
  }
}