import { Box, ButtonGroup, IconButton, MenuItem, Select, useColorScheme } from "@mui/material";
import { HEADINGS, LOW_PRIORIRTY, RICH_TEXT_OPTIONS, RichTextAction } from "../constants";
import { Divider } from "../Components/Divider";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { useEffect, useState } from "react";
import {mergeRegister , $getNearestNodeOfType} from '@lexical/utils'
import {$createHeadingNode, HeadingTagType} from '@lexical/rich-text'
import {$wrapNodes} from '@lexical/selection'
import { useKeyBindings } from "../hooks/UseKeyBindings";
import ColorPlugin from "./ColorPlugin";
import { ListPlugin } from "./ListPlugin";
import {$isListNode, ListNode} from '@lexical/list'
import {TabelPlugin} from "./TablePlugin";
import { LinkPlugin } from "./LinkPlugin";
import { CustomListPlugin } from "./CustomListPlugin";
import blacksvg from "../../public/x-diamond-fill.svg"
import redsvg from "../../public/x-diamond-fill-red.svg"

export default function ToolBarPlugin(){
    const [editor] = useLexicalComposerContext()
    const [disableMap,setDisableMap] = useState<{[id:string]:boolean }>({
        [RichTextAction.Undo] : true ,
        [RichTextAction.Redo] : true
    })

    const [headingValue,setHeadingValue] = useState<string>('')
    const [selectioneMap,setSelectioneMapp] = useState<{[id:string]:boolean }>({})
    const [blockType, setBlockType] =useState('paragraph')

    const updateToolbar= ()=>{
        const selection = $getSelection()

        if($isRangeSelection(selection)){
            const newSelectionMap = {
                [RichTextAction.Bold]: selection.hasFormat("bold"),
                [RichTextAction.Underline]: selection.hasFormat("underline"),
                [RichTextAction.Italics]: selection.hasFormat("italic"),
                [RichTextAction.Strikethrough]: selection.hasFormat("strikethrough"),
                [RichTextAction.Superscript]: selection.hasFormat("superscript"),
                [RichTextAction.Subscript]: selection.hasFormat("subscript"),
                [RichTextAction.Code]: selection.hasFormat("code"),
                [RichTextAction.Highlight]: selection.hasFormat("highlight"),
            }

            setSelectioneMapp(newSelectionMap)

            const anchorNode = selection.anchor.getNode()
            const element =anchorNode.getKey() === 'root' 
                ? anchorNode
                : anchorNode.getTopLevelElementOrThrow()
            
            const elementkey = element.getKey()
            const elemntDOM = editor.getElementByKey(elementkey)

            if(!elemntDOM) return

            if($isListNode(element)){
                const parentList = $getNearestNodeOfType(anchorNode,ListNode)
                const type = parentList ? parentList.getTag() : element.getTag()
                setBlockType(type)
            }
        }
    }
    //
    useEffect(()=> {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    updateToolbar()
                })
            }),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {ListPlugin
                    updateToolbar()
                    return false
                },
                LOW_PRIORIRTY
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setDisableMap( (prevDisableMap)=> ({
                        ...prevDisableMap ,
                        undo : !payload
                    }))
                    return false
                },
                //We can ass multiple event listners for the same comman . that is why we give the a priority
                //funtions are called by the order of priority
                LOW_PRIORIRTY
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setDisableMap( (prevDisableMap)=> ({
                        ...prevDisableMap ,
                        redo : !payload
                    }))
                    return false
                },
                LOW_PRIORIRTY
            )
        )
    },[])

    const onAction=(id:RichTextAction)=>{
        switch(id){
            case RichTextAction.Bold: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND,"bold")
                break
            }
            case RichTextAction.Italics: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND,"italic")
                break
            }
            case RichTextAction.Underline: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND,"underline")
                break
            }
            case RichTextAction.Strikethrough: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND,"strikethrough")
                break
            }
            case RichTextAction.Superscript: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND,"superscript")
                break
            }
            case RichTextAction.Subscript: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
                break
            }
            case RichTextAction.Highlight: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
                break
            }
            case RichTextAction.Code: {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
                break
            }
            case RichTextAction.LeftAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
                break
            }
            case RichTextAction.RightAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
                break
            }
            case RichTextAction.CenterAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
                break
            }
            case RichTextAction.JustifyAlign: {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
                break
            }
             case RichTextAction.Undo: {
                editor.dispatchCommand(UNDO_COMMAND, undefined)
                break
            }
             case RichTextAction.Redo: {
                editor.dispatchCommand(REDO_COMMAND,undefined )
                break
            }
        }
            
    }

    useKeyBindings({onAction})

    const getSelectedbuttonProps = (isSelected:boolean ) => isSelected ? {
        sx: {
          bgcolor: "blue",
          color: "white",
        },
    } : {}

    const updateHeading = (heading:HeadingTagType) => {
        setHeadingValue(heading)
        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                $wrapNodes(selection, () => $createHeadingNode(heading));
            }
        });
    }

    return <Box display="flex">
        <ButtonGroup  
            variant="text"
            size="small"
            sx={{
                color: "#444",
            }}
            className="buttonGroup"
        >
            <select
                value={headingValue}
                onChange={(e) => {
                    const value = e.target.value as HeadingTagType;
                    updateHeading(value);
                }}
                >
                <option value="" disabled>
                    Select a Heading
                </option>

                {HEADINGS.map((heading) => (
                    <option key={heading} value={heading}>
                    {heading}
                    </option>
                ))}
            </select>
            
            {RICH_TEXT_OPTIONS.map(({id,label,icon,fontsize})=>(
                id === RichTextAction.Divider ? <Divider/> :
                <IconButton 
                    key={id}
                    aria-label={label}
                    onClick={() => { onAction(id) }}
                    sx={{
                        fontSize: fontsize,
                    }}
                    disabled={disableMap[id]}
                    {...getSelectedbuttonProps(selectioneMap[id])}
                >
                    {icon}
                </IconButton>
            ))}

            <Box 
                display="flex"
                 sx={{
                    mt: 1,
                    gap:1
                }}
            >
                <ColorPlugin></ColorPlugin>
                <ListPlugin blockType={blockType}></ListPlugin>
                <TabelPlugin></TabelPlugin>
                <LinkPlugin></LinkPlugin>
                <CustomListPlugin className="editor-list-ul-star" icon={<img src={redsvg} alt="Table" width={20} height={20} />} label={""} />
                <CustomListPlugin className="editor-list-ul-custom" icon={<img src={blacksvg} alt="Table" width={20} height={20} />} label={""} />
            </Box>
        </ButtonGroup>
    </Box>
}