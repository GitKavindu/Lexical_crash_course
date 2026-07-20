import { Box, Button } from "@mui/material";
import { RichTextEditor } from "./RichTextEditor";
import { useEffect, useState } from "react";
import { useUpdateData } from "./api";


export default function Form() {
    const [value,setValue]= useState('')
    const [isPending,setIsPending ]= useState<boolean>(false)
    const {data} = {data: '<p><b><code spellcheck="false" style="white-space: pre-wrap;"><strong class="text-bold text-code">sdsadasd</strong></code></b></p>'}

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