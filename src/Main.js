import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserForm from './UserForm';
import UserResult from './UserResult';

const useStyle = makeStyles({
  main:{
		display: 'flex',
		justifyContent: 'space-between',  
    width: '100%',
    alignItems: 'center',
    '@media (max-width: 600px)':{
      display: 'block'
    }
  },
})

export default function Main(){
  const classes = useStyle();
  return (
    <div id='main' className={classes.main}>
      <UserForm/>
      <UserResult/>
    </div>
  )
}