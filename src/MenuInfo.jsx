import { useRecoilValue, useRecoilState } from "recoil";
import { userSection } from "./atom";
import { useEffect, useState } from "react";
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

//schema base url
const schemaUrl = 'https://infuser.odcloud.kr/oas/docs'

//api base url
const apiUrl = 'https://api.odcloud.kr/api'

//section에 맞는 url을 넘겨줍니다.
function getSchemaUrl(section){
  const url = schemaUrl + '?namespace='+ sectionCode[section]+'/v1';
  return url + '&serviceKey=' + process.env.REACT_APP_ENCODING;
}

//section의 메뉴 데이터를 넘겨줍니다
//비동기함수 입니다.
async function getMenuData(section){
  const schema = await axios.get(getSchemaUrl(section))
  console.log(schema);
  const dataPhath = Object.keys(schema.data.paths)[0];
  const dataRes = await axios.get(apiUrl + dataPhath + 
      '?serviceKey=' + process.env.REACT_APP_ENCODING + '&perPage=1000')
  return dataRes.data;
}


export default function MenuInfo(props){
  //api 요청이 끝났는지 확인을 위한 변수
  const [myState, setMyState] = useState(false);
  //섹션
  const section = useRecoilValue(userSection);
  //받은 데이터
  const [data, setData] = useState('null');

  useEffect(()=>{
    setMyState(false);
    (async ()=>{
      let data = await getMenuData(section);
      setData(data.data[0]['석식']);
      console.log(data);
      setMyState(true);
    })();
  }, [section, setMyState, setData])

  if (myState){
    return(
      <div>
        <span>{data}</span> 
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
