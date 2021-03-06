import React, { useState } from "react";
import {InputFormat, SelectFormat} from "./InputFormat";
import { makeStyles } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { userHeight, userWeight, userSection } from "./atom";
import { shouldBmrBeDefault, userBmr } from "./selector";

const useStyle = makeStyles({
  formInfo: {
    padding: '5px',
    border: '1px',
    width: '256px'
  }
})

// input 이벤트를 받아 formSetter를 호출하고,
// 입력값을 검증한 뒤 recoilSetter에 넘겨줍니다.
// 이 함수의 제약: pure function.
// numberConsumer: number -> any
function onNumberInputEvent(formSetter, recoilSetter) {
  return (event) => {
    const input = event.target.value;
    formSetter(input);
    const newValue = parseFloat(input);
    if (newValue) {
      recoilSetter(newValue);
    }
  }
}

// parseFloat 한 결과를 갖다 박습니다..
function onNullableNumberInput(formSetter, recoilSetter) {
  return (event) => {
    const input = event.target.value;
    formSetter(input);
    const newValue = parseFloat(input);
    recoilSetter(newValue);
  }
}

const availableSections = [
  '1691', '2171', '3296', '3389', '5021',
  '5322', '6176', '6282', '6335', '7369',
  '7652', '8623', '8902', '9030', '육군훈련소'
];

// select input 이벤트를 받아 formSetter를 호출하고,
// 입력값을 검증한 뒤 recoilSetter에 넘겨줍니다.
// 이 함수의 제약: pure function.
// setter: string -> any
function onSelectEvent(formSetter, recoilSetter){
  return(event => {
    const selectedItem = event.target.value;
    if (availableSections.indexOf(selectedItem) !== -1) {
      formSetter(selectedItem);
      recoilSetter(selectedItem);
    }
  });
}

export default function UserForm(){
  const classes = useStyle();
  const [height, setHeight] = useRecoilState(userHeight);
  const [weight, setWeight] = useRecoilState(userWeight);
  const [section, setSection] = useRecoilState(userSection);
  const [bmr, setBmr] = useRecoilState(userBmr);
  const shouldUseDefaultBmr = useRecoilValue(shouldBmrBeDefault);
  const [heightInput, setHeightInput] = useState(height);
  const [weightInput, setWeightInput] = useState(weight);
  const [sectionInput, setSectionInput] = useState(section);
  const [bmrInput, setBmrInput] = useState(bmr);
  return (
    <div className={classes.formInfo}>
      <InputFormat content="키(cm)"
                   onChange={onNumberInputEvent(setHeightInput, setHeight)}
                   value={heightInput} />
      <br />
      <InputFormat content="몸무게(kg)"
                   onChange={onNumberInputEvent(setWeightInput, setWeight)}
                   value={weightInput} />
      <br />
      <SelectFormat content="표준식단부대"
                    onChange={onSelectEvent(setSectionInput, setSection)}
                    value={sectionInput}
                    items={availableSections} />
      <InputFormat content="기초대사량(kcal)"
                   onChange={onNullableNumberInput(setBmrInput, setBmr)}
                   value={shouldUseDefaultBmr? bmr: bmrInput} />
    </div>
  )
};
