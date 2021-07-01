import { useRecoilValue, useRecoilState } from "recoil";
import { userSection } from "./atom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Tabs, Tab, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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

const useStyles = makeStyles((theme) => ({
  meals: {
    flexGrow: 1,
    display: 'flex',
    height: 224,
    padding: '1px'
  },
  tabs: {
    borderRight: `1px solid`,
  },
}));

// schema base url
const schemaUrl = 'https://infuser.odcloud.kr/oas/docs'

// api base url
const apiUrl = 'https://api.odcloud.kr/api'

// section에 맞는 url을 넘겨줍니다.
function getSchemaUrl(section){
  const url = schemaUrl + '?namespace='+ sectionCode[section]+'/v1';
  return url + '&serviceKey=' + process.env.REACT_APP_ENCODING;
}

// section의 메뉴 데이터를 넘겨줍니다
async function getMenuData(section){
  let schema;
  let dataRes;

  try {
    schema = await axios.get(getSchemaUrl(section))
  } catch (e) {
    console.log(e, 'schema error');
    throw (e);
  }
  
  const dataPhath = Object.keys(schema.data.paths)[0];
  try {
    dataRes = await axios.get(apiUrl + dataPhath + 
      '?serviceKey=' + process.env.REACT_APP_ENCODING + '&perPage=1000')
  } catch(e) {
    console.log(e, 'api error');
    throw (e);
  }
  return dataRes.data;
}

// 짬
class Trash {
  constructor(menu, calorie) {
    this.menu = menu;
    this.calorie = calorie
  }
}

// 짬통
class TrashBag {
  constructor() {
    this.breakfastMenus = [];
    this.lunchMenus     = [];
    this.dinnerMenus    = [];
    this.overallCalorie = 0;
  }
  addBreakfast(aTrash) {
    if (aTrash.menu) {
      this.breakfastMenus.push(aTrash);
    }
    return this;
  }
  addLunch(aTrash) {
    if (aTrash.menu) {
      this.lunchMenus.push(aTrash);
    }
    return this;
  }
  addDinner(aTrash) {
    if (aTrash.menu) {
      this.dinnerMenus.push(aTrash);
    }
    return this;
  }
  addCalorie(calorie) {
    if (calorie)
      this.overallCalorie += calorie;
    return this;
  }
};

function trashBagFromMilitaryFormat(data) {
  const trashBag = new TrashBag();
  for (const item of data) {
    trashBag
      .addBreakfast(
        new Trash(item['조식'], parseFloat(item['조식열량'])))
      .addLunch(
        new Trash(item['중식'], parseFloat(item['중식열량'])))
      .addDinner(
        new Trash(item['석식'], parseFloat(item['석식열량'])))
      .addCalorie(parseFloat(item['열량합계']) || 0);
  }
  return trashBag;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}
/*
  props: {
    date: string ("yyyy-mm-dd");
    section: string (see UserForm.jsx$availableSection)
  }
 */
export default function MenuInfo(props){
    const classes = useStyles();
  //api 요청이 끝났는지 확인을 위한 변수
  const [apiState, setApiState] = useState(0);
  //섹션
  const section = useRecoilValue(userSection);
  //받은 데이터
  const [data, setData] = useState('null');
  let meal =  // 이건 그냥 예시입니다.
    new TrashBag()
      .addBreakfast(new Trash('전투식량1형', 1100))
      .addLunch(new Trash('전투식량2형', 1100))
      .addDinner(new Trash('군용쌀건빵', 450))
      .addCalorie(2650);
  //section이 바뀌면 실행됩니다.
  const [mealTab, setMealTab] = useState(0);
  const handleTabs = (event, newValue) => {
    setMealTab(newValue);
  };
  //console에 data를 출력하는 부분은 완성되면 지워야 합니다.
  useEffect(() => {
    setApiState(0);
    const dropData = async () => {
      try {
        const data = await getMenuData(section);
        setData(data.data);
        
        console.log(data);
        setApiState(1);
      } catch (e) {
        console.log(e)
        setApiState(2);
      }
    };
    dropData();
  }, [section])
  
  if (apiState === 0) {
    return (
      <div>
        <span>loading...</span>
      </div>
    )
  } else if (apiState === 1) {
    // It's a puzzle! Guess what this statement means ;P
    const day = ((splittedDate) =>
      (
        (parseInt(splittedDate[splittedDate.length - 1]) - 1)
          % 28 + 1
      ).toString().padStart(2,'0')
    )(props.date.split('-'));
    
    const todayData = data.filter((item) => item['날짜'].endsWith(day));
    meal = trashBagFromMilitaryFormat(todayData);
    
    const breakfastElem = meal.breakfastMenus.map(
      (aTrash) => <li key={'조' + aTrash.menu}>{aTrash.menu}</li>
    );
    const lunchElem = meal.lunchMenus.map(
      (aTrash) => <li key={'중' + aTrash.menu}>{aTrash.menu}</li>
    );
    const dinnerElem = meal.dinnerMenus.map(
      (aTrash) => <li key={'동' + aTrash.menu}>{aTrash.menu}</li>
    );

    return (
      
      <div className={classes.meals}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={mealTab}
          onChange={handleTabs}
          aria-label="meals"
          className={classes.tabs}
        >
          <Tab label="조식" {...a11yProps(0)} />
          <Tab label="중식" {...a11yProps(1)} />
          <Tab label="석식" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={mealTab} index={0}>
          {breakfastElem}
        </TabPanel>
        <TabPanel value={mealTab} index={1}>
          {lunchElem}
        </TabPanel>
        <TabPanel value={mealTab} index={2}>
          {dinnerElem}
        </TabPanel>
        {/* <div>
          <div>
            조식
          </div>
          <ul style={{listStyleType: 'none'}}>
            {breakfastElem}
          </ul>
        </div>
        <div>
          <div>
            중식
          </div>
          <ul style={{listStyleType: 'none'}}>
            {lunchElem}
          </ul>
        </div>
        <div>
          <div>
            석식
          </div>
          <ul style={{listStyleType: 'none'}}>
            {dinnerElem}
          </ul>
        </div>
        <div>
          총 칼로리는 {meal.overallCalorie}kcal 입니다.
        </div> */}
      </div>
    )
  } else if (apiState === 2) {
    return (
      <div>
        <span>error!</span>
      </div>
    )
  }
}
