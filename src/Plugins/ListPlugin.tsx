import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { IconButton } from "@mui/material";
import { ListOl, ListUl } from "react-bootstrap-icons";
import {INSERT_ORDERED_LIST_COMMAND,INSERT_UNORDERED_LIST_COMMAND,REMOVE_LIST_COMMAND} from "@lexical/list"
import {getSelectedBtnProps} from '../Utils/index'
interface ListPluginProps{
    blockType:string
}

export function ListPlugin({ blockType }:ListPluginProps){

    const [editor] =useLexicalComposerContext()
    //const blockType =
    return <>
        <IconButton
            aria-label="Add Ordered list"
            {...getSelectedBtnProps(blockType === "ol")}
            size="small"
            onClick={()=>{
                if(blockType === 'ol'){
                    editor.dispatchCommand(REMOVE_LIST_COMMAND,undefined)
                }
                else{
                    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND,undefined)
                    blockType='ol'
                }
            }}
        >
            {<ListOl></ListOl>}
        </IconButton>

        <IconButton
            aria-label="Add Unordered list"
            {...getSelectedBtnProps(blockType === "ul")}
            size="small"
            onClick={()=>{
                if(blockType === 'ul'){
                    editor.dispatchCommand(REMOVE_LIST_COMMAND,undefined)
                }
                else{
                    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND,undefined)
                }
                   
            }}
            
        >
            {<ListUl/>}
        </IconButton>
    </>
}