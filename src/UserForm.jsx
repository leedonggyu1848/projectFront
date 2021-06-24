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
   //atom의 height, weight, section과 사용자 입력을 연결시킴
   //InputFormat은 숫자만 받을 수 있게 한다.
   //받은 값을 float로 바꾸고 바꿀수 없다면 0을 반환한다. (12.12aa -> 12.12 같은 방식)
   return(
      <div className={classes.formInfo}>
        <InputFormat content='키' 
          onChange={(e)=>{setHeight(parseFloat(e.target.value) || 0)}} 
          value={useHeight}/>
        <br/>
        <InputFormat content='몸무게' 
          onChange={(e)=>{setWeight(parseFloat(e.target.value) || 0)}} 
          value={useWeight}/>
        <br/> 
        <InputFormat content='부대' 
          onChange={(e)=>{setSection(parseFloat(e.target.value) || 0)}} 
          value={useSection}/>
      </div>
   )
 };
