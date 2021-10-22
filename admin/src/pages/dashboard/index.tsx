import React, { useEffect } from 'react'
import styles from './index.scss'
import { articleList } from '../../../api/article'

export default function Page() {
  useEffect(() => {
    articleList({})
    
    return () => {
      
    }
  }, [])

  return (
    <div>
      <h1 className={styles.title}></h1>
    </div>
  );
}
