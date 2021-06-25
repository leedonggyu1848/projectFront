import { FormControl, InputLabel, Input, Select, MenuItem } from "@material-ui/core";

/* props: {
**   content: string; 폼 컨트롤에 대한 설명
**   value: number; 기본값
**   onChange: ReactEvent -> void;
** }
*/
function InputFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Input value={props.value} onChange={props.onChange}/>
    </FormControl>
  )
}

/* props:{
**  content: string; 폼 컨트롤에 대한 설명
**  value: string; 기본값
**  onChange: ReactEvent -> void;
**  items: array; select의 option값
** }
*/ 
function SelectFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Select value={props.value} onChange={props.onChange}>
        {props.items.map((item)=>(<MenuItem key={item} value={item}>{item}</MenuItem>))}
      </Select>
    </FormControl>
  )
}

export {InputFormat, SelectFormat};