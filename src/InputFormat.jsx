import { FormControl, InputLabel, Input } from "@material-ui/core";

export default function InputFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Input/>
    </FormControl>
  )
}