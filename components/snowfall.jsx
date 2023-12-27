/**
 * @typedef Props
 *   Props.
 * @property {string} color
 *   Color.
 * @property {number} year
 *   Year.
 */

import styles from './counters.module.css'

import React from 'react'

const data = [6, 5, 2, 4.5, 1.5, 2.5, 2, 2.5, 1.5, 2.5, 3.5, 7]

/**
 * @param {Readonly<Props>} props
 *   Props.
 * @returns {JSX.Element}
 *   Element.
 */
export function Chart(props) {
  return (
    <div className={styles.snowfall}>
      {data.map(function (d,i) {
        return (
          <div
            key={i}
            className={styles["snowfall-bar"]}
            style={{
              backgroundColor: props.color,
              height: 'calc(' + d + ' * 0.5 * (1em + 1ex))'
            }}
          />
        )
      })}
    </div>
  )
}