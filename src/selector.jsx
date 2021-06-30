import { selector } from "recoil";
import { userHeight, userWeight, userSection, userBmrValue } from "./atom";

/*
  userBmi: 체질량지수
  value: number
  setter: undefined
 */
const userBmi = selector({
  key: 'userBmi',
  get: ({get}) => {
    const height = get(userHeight) / 100;
    const weight = get(userWeight);
    if (height === 0) {
      return 0;
    }
    return Math.round(weight/(height*height)*100)/100;
  }
});

/*
  userBmr: 기초대사량(계산됨)
  value: number
  setState: number | undefined -> void
 */
const userBmr = selector({
  key: 'userBmr',
  get: ({get}) => {
    const bmr = get(userBmrValue);
    if (bmr) {
      return bmr;
    } else {
      const calculation = 66 + (13.8 * get(userWeight))
            + (5 * get(userHeight)) - (6.8 * 21);
      return Math.round(calculation*100)/100;
    }
  },
  set: ({get, set, reset}, newValue) => {
    set(userBmrValue, newValue)
  }
});

const shouldBmrBeDefault = selector({
  key: 'shouldBmrBeDefault',
  get: ({get}) => get(userBmrValue) == null
});

export { userBmi, userBmr, shouldBmrBeDefault };
