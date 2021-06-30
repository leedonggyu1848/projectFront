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
  let schema;
  let dataRes;

  try{
    schema = await axios.get(getSchemaUrl(section))
  }catch(e){
    console.log(e, 'schema error');
    throw(e);
  }
  const dataPhath = Object.keys(schema.data.paths)[0];
  try{
    dataRes = await axios.get(apiUrl + dataPhath + 
      '?serviceKey=' + process.env.REACT_APP_ENCODING + '&perPage=1000')
  }catch(e){
    console.log(e, 'api error');
    throw(e);
  }
  return dataRes.data;
}

export default function MenuInfo(props){
  //api 요청이 끝났는지 확인을 위한 변수
  const [apiState, setApiState] = useState(0);
  //섹션
  const section = useRecoilValue(userSection);
  //받은 데이터
  const [data, setData] = useState('null');

  //section이 바뀌면 실행됩니다.
  //console에 data를 출력하는 부분은 완성되면 지워야 합니다.
  useEffect(()=>{
    setApiState(0);
    (async ()=>{
      try{
        let data = await getMenuData(section);
        setData(data.data[0]['석식']);
        console.log(data);
        setApiState(1);
      }catch(e){
        console.log(e)
        setApiState(2);
      }
    })();
  }, [section, setApiState, setData])

  if (apiState === 0){
    return(
      <div>
      <span>loading...</span>
      </div>
    )
  }else if(apiState === 1){
    return(
      <div>
        <span>{data}</span> 
      </div>
    )
  }else if(apiState === 2){
    return(
      <div>
        <span>error!</span>
      </div>
    )
  }
}
