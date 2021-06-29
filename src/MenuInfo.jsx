import { useRecoilValue, useRecoilState } from "recoil";
import { userSection } from "./atom";
import { dateMenu } from "./menuAtom";
import axios from "axios";

const sectionCode={
  '육군훈련소': 15069402,
  '1691': 15069404,
  '2171': 15069407,
  '3296': 15077866,
  '3389': 15069409,
  '5021': 15069440,
  '5322': 15069414,
  '6176': 15069434,
  '6282': 15069416,
  '6335': 15069418,
  '7369': 15069424,
  '8623': 15081063,
  '8902': 15069428,
  '9030': 15069430,
  '7652': null
};

const apiUrl = 'https://api.odcloud.kr/api'

function getSchemaUrl(section){
  const url = 'https://infuser.odcloud.kr/oas/docs?namespace='+sectionCode[section]+'/v1';
  return url + '&serviceKey=' + process.env.REACT_APP_ENCODING;
}

function reducer(state, action){
  if(action){
    state=true;
    return state;
  }else{
    state=false;
    return state;
  }
}

function getMenuData(section){
  axios.get(getSchemaUrl(section))
    .then((res) => {
      const dataPhath = Object.keys(res.data.paths)[0];
      return axios.get(apiUrl + dataPhath + '?serviceKey=' + process.env.REACT_APP_ENCODING)
    })
    .then((res) => {
      console.log(res);
    })
}

export default function MenuInfo(props){
  const state=false;
  const section = useRecoilValue(userSection);  
  getMenuData(section)
  if (state){
    return(
      <div>
        <span>Info</span>
      </div>
    )
  }else{
    return(
      <div>
        <span>loading...</span>
      </div>
    )
  }
}
