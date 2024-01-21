import React from 'react'

export default function Rubrica({ rubric }) {
    let lista = rubric.map((item, index) => {
        return (
          <div key={index}>
            <input type="checkbox" id={index} name={index} value={index} />
            <label htmlFor={index}>{item}</label><br />
          </div>
        )
      })
  return (
    <div className='Rubric'>
      {lista}
    </div>
  )
}

