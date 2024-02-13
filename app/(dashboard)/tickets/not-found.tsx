import NotFound from '@/app/components/NotFound'
import React from 'react'

const notFound = () => {
  return <NotFound
    description='We could not find ticket that you looking for.'
    urlName='Tickets'
    url='/tickets' />
}

export default notFound