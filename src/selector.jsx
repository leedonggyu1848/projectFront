import { selector } from "recoil";
import { userHeight, userWeight } from "./atom";

const userBmi = selector({
  key:'userBmi',
  get: ({get}) => {
    const height = get(userHeight) / 100;
    const weight = get(userWeight);
    if (height === 0) {
      return 0;
    }
    return Math.round(weight/(height*height)*100)/100;
  }
})

export {userBmi};
