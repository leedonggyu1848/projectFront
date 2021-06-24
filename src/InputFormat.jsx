import { FormControl, InputLabel, Input } from "@material-ui/core";

/* props: {
     content: string; 폼 컨트롤에 대한 설명
     value: number; 기본값
     onChange: ReactEvent -> void;
   }
 */
export default function InputFormat(props){
  return(
    <FormControl>
      <InputLabel>{props.content}</InputLabel>
      <Input value={props.value} onChange={props.onChange}/>
    </FormControl>
  )
}
