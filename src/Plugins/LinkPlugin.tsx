import styled from "@emotion/styled";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";

export const FloatingDivLink = styled("a")({
  display: "block",
  width: "calc(100% - 24px)",
  boxSizing: "border-box",
  margin: "8px 12px",
  padding: "8px 12px",
  borderRadius: 15,
  backgroundColor: "#eee",
  fontSize: 15,
  color: "rgb(5, 5, 5)",
  border: 0,
  outline: 0,
  position: "relative",
  fontFamily: "inherit",
});

interface LinkPluginProps{
    linkType:string
}

export function LinkPlugin({ linkType }:LinkPluginProps){

    const [linkUrl, setLinkUrl] = useState("");

    const [editor] =useLexicalComposerContext()
    
    return <>
        <FloatingDivLink>
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkUrl}
            </a>
        </FloatingDivLink>
    </>
}