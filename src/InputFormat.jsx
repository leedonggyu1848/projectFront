import { FormControl, InputLabel, Input } from "@material-ui/core";

function checkNumber(event) {
  if(event.key === '.' 
     || event.key >= 0 && event.key <= 9) {
    return true;
    }
  return false;
}

export default function InputFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Input onkeypress={checkNumber} value={props.value} onChange={props.onChange}/>
    </FormControl>
  )
}