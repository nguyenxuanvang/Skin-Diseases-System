import React from 'react';
import styles from './Button.module.css'
function Button({textColor = '#ffffff'}) {
  return (
    <div className={styles.Button} style ={{color: textColor}}>
        Get started
    </div>
  )
}

export default Button