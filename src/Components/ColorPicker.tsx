import { Box, ClickAwayListener, IconButton } from "@mui/material";
import { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps{
    color: string,
    onChange:(color:string)=> void
    icon:React.ReactElement
}
export default function ColorPicker({color,onChange,icon}:ColorPickerProps){
    const [isOpen, setIsOpen] = useState(false);    

    return (
         <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box position="relative">
                <IconButton
                    aria-label="Change Color"
                    onClick={() => setIsOpen(true)}
                    sx={{
                        color: "#000000",
                    }}
                    size="small"
                    >
                    {icon}
                </IconButton>

                {isOpen && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "30px",
                        left: "30px",
                        zIndex: 10,
                    }}
                >
                    <SketchPicker
                        color={color}
                        onChangeComplete={(color) => {
                            onChange(color.hex);
                        }}
                    />
                </Box>
                )}
            </Box>
        </ClickAwayListener>
    );
}