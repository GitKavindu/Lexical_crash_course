import { PaintBucket, Type } from "react-bootstrap-icons";
import ColorPicker from "../Components/ColorPicker";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $setSelection, COMMAND_PRIORITY_LOW, RangeSelection, SELECTION_CHANGE_COMMAND } from "lexical";
import {$getSelectionStyleValueForProperty, $patchStyleText} from "@lexical/selection"
import { useEffect, useRef, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { colors } from "@mui/material";

export default function ColorPlugin(){
    const [editor]=useLexicalComposerContext()
    const selectionRef = useRef<RangeSelection | null>(null);
    const [{color,bgcolor},setColors] = useState({
        color:'#000',
        bgcolor:'#fff'
    })
     
    const updateToolbar = () => {
        const selection = $getSelection()
        if($isRangeSelection(selection)){
            const color =$getSelectionStyleValueForProperty(selection,'color','#000')
            const bgcolor =$getSelectionStyleValueForProperty(selection,'background','#fff')
            setColors({color,bgcolor})
        }
    }

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                //update color value
                updateToolbar()
                
                //put the selection value to the reference variable
                editor.getEditorState().read(() => {
                    const selection = $getSelection();

                    if ($isRangeSelection(selection)) {
                        selectionRef.current = selection.clone();
                    }
                });

                return false;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    useEffect(()=> {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    updateToolbar()
                })
            })
        )
    },[editor])
        
    const updateColor = ({property,color}:{ property:'background' | 'color', color:string}) => {
        editor.update(()=>{
            
            if (!selectionRef.current) return;

            $setSelection(selectionRef.current);
            console.log(color,property)
            console.log(selectionRef.current)
            $patchStyleText(selectionRef.current, {
                [property]: color,
            });

        })
    }
    return (
        <>
            <ColorPicker color={color} onChange={(color)=>{
                updateColor({property: "color",color})
            }} icon={<Type/>} ></ColorPicker>
            <ColorPicker color={bgcolor} onChange={(color)=>{
                updateColor({property: "background",color})
            }} icon={<PaintBucket/>} ></ColorPicker>
        </>
    )
}