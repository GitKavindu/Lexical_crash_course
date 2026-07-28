import { Box, Button } from "@mui/material";
import { RichTextEditor } from "./RichTextEditor";
import { useEffect, useState } from "react";


export default function Form() {
    const [value,setValue]= useState('')
    const [isPending,setIsPending ]= useState<boolean>(false)
    const {data} = {data: '<ul class="editor-list-ul editor-list-ul-1 editor-list-ul-star"><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">sdasdsd</span></li><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">sdasd</span></li><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">sdasdsa</span></li><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">sadsad</span></li><li value="1" class="editor-list-item"><ul class="editor-list-ul editor-list-ul-2"><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">dssd</span></li><li value="2" class="editor-list-item"><span style="white-space: pre-wrap;">sddsad</span></li><li value="3" class="editor-list-item"><span style="white-space: pre-wrap;">dsaasd</span></li></ul></li></ul><ul class="editor-list-ul editor-list-ul-1 editor-list-ul-custom"><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">dsadsada</span></li><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">dasdsa</span></li><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">sadsad</span></li></ul><p><br></p><ol><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">dsadsadsad</span></li><li value="2" class="editor-list-item"><span style="white-space: pre-wrap;">dsadsad</span></li><li value="3" class="editor-list-item"><span style="white-space: pre-wrap;">sdasdas</span></li><li value="4" class="editor-list-item"><span style="white-space: pre-wrap;">sdadas</span></li></ol><p><br></p><ul class="editor-list-ul editor-list-ul-1"><li value="1" class="editor-list-item"><span style="white-space: pre-wrap;">dsadsadsa</span></li><li value="2" class="editor-list-item"><span style="white-space: pre-wrap;">sadsadsa</span></li><li value="3" class="editor-list-item"><span style="white-space: pre-wrap;">sdasda</span></li><li value="4" class="editor-list-item"><span style="white-space: pre-wrap;">dfsada</span></li></ul>'}

    const OnSave=() => {
        setIsPending(true) 
        setTimeout(() => {
            setIsPending(false)
            console.log("sent value ",value);
        }, 2000);
    }
    
    useEffect(()=>{
        setTimeout(() => {
            //setValue(data)
            console.log("data came  ",data);
        }, 2000);
    },[data])

    return (<Box>
        <RichTextEditor 
            name="ddsasa" 
            value={value} 
            onChange={(newValue) => setValue(newValue)}
            placeholder="Select an item"
        />
        <Button
            variant="contained"
            size="small"
            sx={{
                mt: 2,
                bgcolor: "#25D366",
                "&:hover": {
                bgcolor: "#1ebe5d",
                },
            }}
            onClick={OnSave}
            >
            { isPending ? 'Saving..': 'Save'}
        </Button>
    </Box>
    )
}