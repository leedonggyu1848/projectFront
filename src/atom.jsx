import { atom } from "recoil";

// 키 정보
const userHeight = atom({
  key: 'userHeight',
  default: 0
})

// 몸무게 정보
const userWeight = atom({
  key:'userWeight',
  default: 0
})

// 부대 정보
const userSection = atom({
  key: 'userSection',
  default: '8623'
})

export {userHeight, userWeight, userSection};
