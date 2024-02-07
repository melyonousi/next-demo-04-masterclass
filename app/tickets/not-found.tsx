import React from 'react'
import Link from 'next/link'
import Container from '../components/Container'
import NotFound from '../components/NotFound'

const notFound = () => {
  return <NotFound
    description='We could not find ticket that you looking for.'
    urlName='Tickets'
    url='/tickets' />
}

export default notFound