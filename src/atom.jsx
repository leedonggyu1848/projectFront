import { atom } from "recoil";

//userForm에서 받은 키 정보
const userHeight = atom({
  key: 'userHeight',
  default: 0
})

//userForm에서 받은 몸무게 정보
const userWeight = atom({
  key:'userWeight',
  default: 0
})

//userForm에서 받은 부대 정보

const userSection = atom({
  key: 'userSection',
  default: 0
})

export {userHeight, userWeight, userSection};