import React from "react";
import {InputFormat, SelectFormat} from "./InputFormat";
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

// 이벤트를 받아 numberConsumer에게 넘겨주는 함수를 만들어냅니다. 0이 입력되면 1로 바꿈니다.
// 이 함수의 제약: pure function.
// numberConsumer: number -> any
function onNumberInputEvent(numberConsumer) {
  return (event) => {
    const resolvedNumber = parseFloat(event.target.value) || 1;
    if (resolvedNumber === 0){
      resolvedNumber = 1;
    }
    numberConsumer(resolvedNumber);
  }
}

// 이벤트를 받아 stter 넘겨주는 함수를 만들어냅니다.
// 이 함수의 제약: pure function.
// setter: string -> any
function onSelectEvent(setter){
  return(event => {
    const selectedItem = event.target.value;
    setter(selectedItem);
  })
}

export default function UserForm(){
   const classes = useStyle();
   const [height, setHeight] = useRecoilState(userHeight);
   const [weight, setWeight] = useRecoilState(userWeight);
   const [section, setSection] = useRecoilState(userSection);
   //이 sections값 전역으로 옮기면 좋지 않을까요?
   const sections = ['1691','2171','3296','3389','5021','5322','6176','6282','6335','7369','7652','8623','8902','9030','육군훈련소' ]
  return(
     <div className={classes.formInfo}>
       <InputFormat content='키(cm)' 
                    onChange={onNumberInputEvent(setHeight)} 
                    value={height}/>
       <br/>
       <InputFormat content='몸무게(kg)' 
                    onChange={onNumberInputEvent(setWeight)}
                    value={weight}/>
       <br/> 
       {/* TODO:
        ** select를 추가한 후React.StrictMode에서
        ** 에러가 나오는데 이유를 잘 모르겠네요     
        ** (무시해도 될꺼같긴해요)               
        */}
       <SelectFormat content='부대' 
                    onChange={onSelectEvent(setSection)}
                    value={section}
                    items={sections}/>
     </div>
   )
 };
