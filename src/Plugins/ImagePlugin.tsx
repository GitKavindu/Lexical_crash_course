import React, { useRef, useState } from "react";
import { ImageFill } from "react-bootstrap-icons";
import Modal from "../Components/Modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { Button, IconButton, Input } from "@mui/material";
import { $createImageNode } from "../Nodes/ImageNode";

export default function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();

  const onAddImage = () => {
    let src = "";
    if (url) src = url;
    //Add your image url save path
    if (file) src = URL.createObjectURL(file); 

    editor.update(() => {
      const node = $createImageNode({ src, altText: "Dummy text" , width:150 ,height:150});
      $insertNodes([node]);
    });
    setFile(undefined);
    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="Add Image"
        size="small"
        onClick={() => setIsOpen(true)}
        sx={{
          color: "#333",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ImageFill width={24} height={24} />
      </IconButton>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
          }
          e.target.files = null;
        }}
      />
      {isOpen && (
        <Modal
          title="Add Image"
          onClose={() => setIsOpen(false)}
          footer={
            <Button
              variant="text"
              disabled={!url && !file}
              onClick={onAddImage}
              sx={{
                color: "#444",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              Add Image
            </Button>
          }
          open={isOpen}
        >
          <Input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="Add Image URL"
          />
          <Button
            variant="contained"
            sx={{
              mt: 4,
            }}
            onClick={() => inputRef?.current?.click()}
          >
            {file ? file.name : "Upload Image"}
          </Button>
        </Modal>
      )}
    </div>
  );
}
