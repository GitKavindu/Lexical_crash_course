import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useState } from 'react'
import { $insertNodes } from 'lexical'
interface CustomOnChangePluginPops {
    value:string,
    onChange:(value:string) => void
}

export default function CustomOnChangePlugin({
    value,
    onChange,
} : CustomOnChangePluginPops){ 
    const [editor] = useLexicalComposerContext()
    const [isfirstrender , setIsfirstRender] = useState(true)

    useEffect(()=>{
        if(!value || !isfirstrender) return
        setIsfirstRender(false)
        editor.update(()=>{
            const currentHtml =$generateHtmlFromNodes(editor)
            if(currentHtml!=value){
                const parser= new DOMParser()
                const dom= parser.parseFromString(value,"text/html")
                const nodes=$generateNodesFromDOM(editor,dom)
                $insertNodes(nodes)
            }
        })
    },[editor,value,isfirstrender])
    
    useEffect(()=>{
        setIsfirstRender(true)
    },[value])
    
    return (
        <OnChangePlugin onChange={editorState=>{
            editorState.read(()=>{
                onChange($generateHtmlFromNodes(editor))
            })
        }

        }/>
    )
}