import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Button variant="outline">
        <Link href="/calendario_anual">
          <h1>Calendario Anual</h1>
        </Link>
      </Button>
      <Button variant="outline">
        <Link href="/calendario_semanal">
          <h1>Calendario Semanal</h1>
        </Link>
      </Button>
    </div>
  )
}

export default page