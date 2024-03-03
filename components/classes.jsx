import React from 'react'
import { CollectionPage } from '@/components/collectionPage'
import styles from './counters.module.css'

export default function Classes( { months }) {
  return (
    <div>
        { months.map(month => (
            <div> 
                <h2 className={styles.h2}>{month}</h2> 
                <CollectionPage path={`/clases/${month.toLowerCase()}`}/> 
            </div>)
          )
        } 
    </div>
  )
}
