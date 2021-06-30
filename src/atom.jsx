import { atom } from "recoil";

// 키 정보
//default: number; 173(남자 평균 키)
const userHeight = atom({
  key: 'userHeight',
  default: 173
});

// 몸무게 정보
//default: number; 68(남자 평균 몸무게), 0이면 오류메세지 생김
const userWeight = atom({
  key:'userWeight',
  default: 68
});

// 부대 정보
//default: string; (육군훈련소가 들어가서 string으로 바꿈)
const userSection = atom({
  key: 'userSection',
  default: '8623'
});

// 기초대사량
// default: number | undefined;
// 이 아톰은 오직 userBmr 셀렉터를 통해 접근되어야 한다.
const userBmrValue = atom({
  key: 'userBmrValue',
  default: null
});


export {userHeight, userWeight, userSection, userBmrValue};
