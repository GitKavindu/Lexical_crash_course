import { Box, css } from "@mui/material";
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
interface RichTextEditorprops{

}

const theme:EditorThemeClasses={
    text: {
        bold: 'text-bold',
        underline: 'text-underline',
        strikethrough: 'text-stikethrough',
        italic: 'text-italic',
        code: "text-code"
    }
};



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
            theme,
            onError:()=>{},
            nodes:[HeadingNode,CodeHighlightNode,CodeNode]
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
                <CustomOnChangePlugin value={value} onChange={onChange}/>
            </LexicalComposer>
        </Box>
    }
)