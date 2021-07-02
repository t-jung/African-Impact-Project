import React from 'react'
import './ProfileFrame.css'

import { ThemeProvider } from '@material-ui/core/styles';

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
            Editing  Profile Information:
         </Typography><br/>

    </div>
        
    );
}