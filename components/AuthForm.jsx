"use client"

import { useState } from 'react'
import styles from './counters.module.css'

export default function AuthForm({ handleSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log("AuthForm", email, password)
  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)} className={ styles.form}>
      <label className={ styles.label}>
        <span>Email:</span>
        <input 
          className={styles.input}
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required 
        />
      </label>
      <label className={ styles.label}>
        <span>Password:</span>
        <input 
          className={styles.input}
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required 
        />
      </label>
      <button className={ styles.button }>Submit</button>
    </form>
  )
}