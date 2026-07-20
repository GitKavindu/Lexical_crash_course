import { PaintBucket, Type } from "react-bootstrap-icons";
import ColorPicker from "../Components/ColorPicker";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection } from "lexical";
import {$patchStyleText} from "@lexical/selection"

export default function ColorPlugin(){
    const [editor]=useLexicalComposerContext()
    const updateColor = ({property,color}:{ property:'background' | 'color', color:string}) => {
        editor.update(()=>{
            const selection = $getSelection()
            if(selection) $patchStyleText(selection, {[property]:color})
        })
    }
    return (
        <>
            <ColorPicker color={'black'} onChange={(color)=>{
                updateColor({property: "color",color})
            }} icon={<Type/>} ></ColorPicker>
            <ColorPicker color={'black'} onChange={(color)=>{
                updateColor({property: "background",color})
            }} icon={<PaintBucket/>} ></ColorPicker>
        </>
    )
}