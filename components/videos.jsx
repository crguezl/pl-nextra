import React from 'react'
import Youtube from '@/components/youtube'

export default function Videos({ ids }) {
    //console.log("ids=", ids)
    let youtubes = ids.map(id => {
      if (!id || (Array.isArray(id) && id.length === 0)) return (<div></div>)
      return (
        <div key={id}>
          <Youtube id={id}></Youtube>
          <br/>
        </div>)
    })
    return (
        <div>
          {youtubes}
        </div>
    )
}
