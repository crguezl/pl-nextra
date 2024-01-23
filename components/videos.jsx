import React from 'react'
import Youtube from '@/components/youtube'

export default function Videos({ ids }) {
    let youtubes = ids.map(id => (
        <div>
          <Youtube id={id}></Youtube>
          <br/>
        </div>)
      )
    return (
        <div>
          {youtubes}
        </div>
    )
}
