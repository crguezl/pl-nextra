'use client'

import { useState, useEffect } from 'react'

const catURL=  "https://api.thecatapi.com/v1/images/search?size=full"
const fetcher = () => fetch(catURL).then((res) => res.json())

async function fetchData() {
  // Simulate an API call
  let cat = await fetcher()
  return cat[0]
}

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData().then(setData)
  }, [])

  if (!data) return null

  return <img src={data.url} width={data.width} height={data.height} />
}

export default function ServerComponent() {
  return (
    <div>
      <DataFetcher />
    </div>
  )
}