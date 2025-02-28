import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Button variant="outline">
        <Link href="/aulas">
          <h1>Aulas</h1>
        </Link>
      </Button>
      <Button variant="outline">
        <Link href="/plantoes">
          <h1>Plantoes</h1>
        </Link>
      </Button>
      <Button variant="outline">
        <Link href="/reunioes">
          <h1>Reunioes</h1>
        </Link>
      </Button>
    </div>
  )
}

export default page