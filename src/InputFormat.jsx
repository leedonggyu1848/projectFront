import { FormControl, InputLabel, Input } from "@material-ui/core";

export default function InputFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Input value={props.value} onChange={props.onChange}/>
    </FormControl>
  )
}