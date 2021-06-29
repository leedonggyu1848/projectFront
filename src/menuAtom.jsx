import { atom } from "recoil";

//식단 날짜 정보
//default: string; (날짜)
const dateMenu = atom({
  key: 'dateMenu',
  default: '2021-05-24'
});

export{dateMenu};