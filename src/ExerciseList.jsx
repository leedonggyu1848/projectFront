import { useRecoilValue } from "recoil";
import { menuCalorie } from "./menuAtom";
import { userWeight } from "./atom";
import { makeStyles } from "@material-ui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking, faRunning, 
        faMountain, faFutbol, 
        faSwimmer, faBasketballBall} from "@fortawesome/free-solid-svg-icons";
const useStyle = makeStyles({
  exercise: {
    padding: '2px'
  },
  exElem:{
    listStyle: 'none',
    paddingLeft: 0
  }
})

export default function ExerciseList(){
  const classes = useStyle();
  const menuCal = useRecoilValue(menuCalorie);
  const weight = useRecoilValue(userWeight);
  const exercise = {
    '걷기(5km/hr)': {Coefficient: 0.9, icon: faWalking},
    '달리기(8km/hr)': {Coefficient: 2, icon: faRunning},
    '축구': {Coefficient: 2.5, icon: faFutbol},
    '등산': {Coefficient: 1.5, icon: faMountain},
    '농구': {Coefficient: 2.1, icon: faBasketballBall},
    '수영': {Coefficient: 2.0, icon: faSwimmer},
  }

  class IconAndText{
    constructor(icon, text){
      this.text = text;
      this.icon = icon;
    }
  }
  const exList = ((exCoe) =>{
    let lst = Array();  
    for (let i in exCoe){
      let text = i + ' ' + Math.round(menuCal/(exCoe[i].Coefficient * weight * 4)) + '시간';
      lst.push(new IconAndText(exCoe[i].icon, text))
    }
    return lst;
  })(exercise);

  return(
    <div className={classes.exercise}>
      <strong>오늘 총 칼로리 {menuCal}kcal를 소모하기 위해서는</strong>
      <ul className={classes.exElem} style={{borderLeft:'1px solid', paddingLeft:'5px'}}>
      {exList.map((value) => <li key={value.text}>
        <FontAwesomeIcon icon={value.icon}/>{value.text}</li>)}
      </ul>
      <strong>같은 방법이 있습니다.</strong>
    </div>
  )
}