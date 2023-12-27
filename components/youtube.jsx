//import styles from './counters.module.css'

import React from 'react'
//import YouTube from 'react-youtube';
 
// Example from https://beta.reactjs.org/learn

import { useState } from 'react'
import styles from './counters.module.css'

function MyButton() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick} className={styles.counter}>
        Clicked {count} times
      </button>
    </div>
  )
}

export default function Youtube({ title, height, width, id }) {
    const src = `https://www.youtube.com/embed/${id}`
    width ||= "560" 
    height ||= "315" 
    title ||="YouTube video player" 
  return (
    <iframe 
        width={width} 
        height={height}
        src={src}
        title={title} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
    </iframe>
  )
}
