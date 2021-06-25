import { atom } from "recoil";

// 키 정보
//default: number;
const userHeight = atom({
  key: 'userHeight',
  default: 0
})

// 몸무게 정보
//default: number;
const userWeight = atom({
  key:'userWeight',
  default: 0
})

// 부대 정보
//default: string; (육군훈련소가 들어가서 string으로 바꿈)
const userSection = atom({
  key: 'userSection',
  default: '8623'
})

export {userHeight, userWeight, userSection};
