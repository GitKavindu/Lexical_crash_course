import { Box, Button, css } from "@mui/material";
import React, { useMemo } from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer"
import {HeadingNode} from "@lexical/rich-text"
import {CodeHighlightNode,CodeNode} from "@lexical/code"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable} from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import "./RichTextEditor.css"
import ToolBarPlugin from "./Plugins/ToolBarPlugin";
import { EditorThemeClasses } from "lexical";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import CustomOnChangePlugin from "./Plugins/CustomOnChanePlugin";
import { ListNode, ListItemNode } from "@lexical/list"
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {TableNode , TableCellNode , TableRowNode} from '@lexical/table'
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { theme } from "./theme";
import { ImageNode } from "./Nodes/ImageNode";
import ImagePlugin from "./Plugins/ImagePlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
interface RichTextEditorprops{

}

interface RichTextEditorProps {
    value : string;
    onChange: (value:string) => void ;
    placeholder? : string ;
    name:string;
}
export const RichTextEditor : React.FC<RichTextEditorprops> =React.memo(
    function  RichTextEditor({value,onChange,placeholder,name}){
        
        const initialConfig =useMemo(()=>({
            namespace: name,
            theme:theme,
            onError:()=>{},
            nodes:[HeadingNode,CodeHighlightNode,CodeNode, ListNode, ListItemNode ,TableNode , TableCellNode , TableRowNode,ImageNode, AutoLinkNode,LinkNode,]
        }),[name]);

        return <Box>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolBarPlugin></ToolBarPlugin>
                <Box position="relative">
                    <RichTextPlugin contentEditable={
                        <ContentEditable
                            className="contentEditable"
                        />
                        } placeholder={<Box className="placeholder">{placeholder}</Box>} 
                        ErrorBoundary={LexicalErrorBoundary}>
                        
                    </RichTextPlugin>
                </Box>
                <AutoFocusPlugin/>
                <HistoryPlugin/>
                <ListPlugin/>
                <TablePlugin></TablePlugin>
                <CustomOnChangePlugin value={value} onChange={onChange}/>
                <ImagePlugin></ImagePlugin>
            </LexicalComposer>
        </Box>
    }
)