import React from "react";
import InputFormat from "./InputFormat";
import { makeStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { userHeight, userWeight, userSection } from "./atom";

const useStyle = makeStyles({
  formInfo: {
    padding: '5px',
    border: '1px',
    width: '256px'
  }
})

// 이벤트를 받아 numberConsumer에게 넘겨주는 함수를 만들어냅니다.
// 이 함수의 제약: pure function.
// numberConsumer: number -> any
function onNumberInputEvent(numberConsumer) {
  return (event) => {
    const resolvedNumber = parseFloat(event.target.value) || 0;
    numberConsumer(resolvedNumber);
  }
}

export default function UserForm(){
   const classes = useStyle();
   const [height, setHeight] = useRecoilState(userHeight);
   const [weight, setWeight] = useRecoilState(userWeight);
   const [section, setSection] = useRecoilState(userSection);

  return(
     <div className={classes.formInfo}>
       <InputFormat content='키' 
                    onChange={onNumberInputEvent(setHeight)} 
                    value={height}/>
       <br/>
       <InputFormat content='몸무게' 
                    onChange={onNumberInputEvent(setWeight)}
                    value={weight}/>
       <br/> 
       <InputFormat content='부대' 
                    onChange={onNumberInputEvent(setSection)}
                    value={section}/>
     </div>
   )
 };
