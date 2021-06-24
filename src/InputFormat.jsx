import { FormControl, InputLabel, Input } from "@material-ui/core";
//input 부분 하나로 묶음
export default function InputFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Input value={props.value} onChange={props.onChange}/>
    </FormControl>
  )
}