import { atom } from "recoil";

const userHeight = atom({
  key: 'userHeight',
  default: 0
})

const userWeight = atom({
  key:'userWeight',
  default: 0
})

const userSection = atom({
  key: 'userSection',
  default: 0
})

export {userHeight, userWeight, userSection};