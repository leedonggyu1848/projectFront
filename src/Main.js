import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserForm from './UserForm';
import UserResult from './UserResult';

//user정보를 받고, user정보를 기반으로 통계치를 보여줌
//xs(600px)이 되면 row방향 flex가 block으로 바뀌어 모든 컨텐츠를 column방향으로 만듬
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