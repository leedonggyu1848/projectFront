import { useRecoilValue, useRecoilState } from "recoil";
import { userSection } from "./atom";
import { useEffect, useState } from "react";
import { dateMenu } from "./menuAtom";
import axios from "axios";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

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

async function getMenuData(section){
  const schema = await axios.get(getSchemaUrl(section))
  const dataPhath = Object.keys(schema.data.paths)[0];
  const dataRes = await axios.get(apiUrl + dataPhath + '?serviceKey=' + process.env.REACT_APP_ENCODING)
  return dataRes.data;
}

export default function MenuInfo(props){
  const [myState, setMyState] = useState(false);
  const section = useRecoilValue(userSection);
  const [data, setData] = useState('null');
  getMenuData(section)

  useEffect(()=>{
    setMyState(false);
    (async ()=>{
      let data = await getMenuData(section);
      setData(data.data[0]['석식']);
      console.log(data.data);
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
