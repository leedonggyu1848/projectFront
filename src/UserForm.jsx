import React from "react";
import InputFormat from "./InputFormat";
import { makeStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { userHeight, userWeight, userSection} from "./atom";

const useStyle = makeStyles({
  formInfo: {
    padding: '5px',
    border: '1px',
    width: '256px'
  }
})

 export default function UserForm(){
   const classes = useStyle();
   const [useHeight, setHeight] = useRecoilState(userHeight);
   const [useWeight, setWeight] = useRecoilState(userWeight);
   const [useSection, setSection] = useRecoilState(userSection);

   return(
      <div className={classes.formInfo}>
        <InputFormat content='키' 
          onChange={(e)=>{setHeight(e.target.value)}} 
          value={useHeight}/>
        <br/>
        <InputFormat content='몸무게' 
          onChange={(e)=>{setWeight(e.target.value)}} 
          value={useWeight}/>
        <br/> 
        <InputFormat content='부대' 
          onChange={(e)=>{setSection(e.target.value)}} 
          value={useSection}/>
      </div>
   )
 };
