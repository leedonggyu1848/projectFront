import React from "react";
import InputFormat from "./InputFormat";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  formInfo: {
    padding: '5px',
    border: '1px',
    width: '256px'
  }
})

 export default function UserForm(){
   const classes = useStyle();
   return(
      <div className={classes.formInfo}>
        <InputFormat content='키' />
        <br/>
        <InputFormat content='몸무게'/>
        <br/> 
        <InputFormat content='부대'/>
      </div>
   )
 };
