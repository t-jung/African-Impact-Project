import React from 'react'
import './ProfileFrame.css'

import styles from '../styles'
import { Typography } from '@material-ui/core';

export default function Setting () {
    return (
<div class="formContainer card">
        <Typography style={{
                    color: styles.palette.primary.main,
                    fontWeight: 900,
                    fontSize: 30,
                }}>
            Settings:
         </Typography><br/>

    </div>
        
    );
}