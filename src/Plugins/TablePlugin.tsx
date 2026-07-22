import { Button, IconButton, TextField } from "@mui/material"
import { useState } from "react";
import { Table } from "react-bootstrap-icons"
import Modal from "../Components/Modal"
import {$createTableNodeWithDimensions} from '@lexical/table'
import {$insertNodeToNearestRoot} from '@lexical/utils'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function TabelPlugin(){
    const [isOpen, setIsOpen] = useState(false);  
    const [rows, setRows] = useState<number>(0)
    const [columns, setColumns] = useState<number>(0)
    const [editor] = useLexicalComposerContext()

    const onAddTable = () => {
        if(!rows || !columns) return
        editor.update(()=>{
           const tableNode = $createTableNodeWithDimensions(rows, columns, {
                rows: true,
                columns: false,
            });
            $insertNodeToNearestRoot(tableNode)
        })
        setRows(1)
        setColumns(1)
        setIsOpen(false)

    }

    return <>
        {isOpen && (<Modal title="Add Table" open={isOpen} onClose={() => setIsOpen(false)} 
            footer={<Button disabled={!rows || ! columns} onClick={onAddTable}>Add</Button>}
        >
            <TextField
                type="number"
                size="small"
                value={rows}
                placeholder="Rows"
                sx={{ mt: 8 ,width: 100,}}
                inputProps={{
                    min: 0,
                    max: 7,
                }}
                onChange={(e) => setRows(Number(e.target.value))}
            />
            
            <TextField
                type="number"
                size="small"
                value={columns}
                placeholder="Columns"
                inputProps={{
                    min: 0,
                    max: 7,
                }}
                sx={{
                    mt: 8,
                    width: 100,
                }}
                onChange={(e) => setColumns(Number(e.target.value))}
            />
        </Modal>
        )}
        <IconButton
            aria-label="Add Table"
            size="small"
            onClick={()=>{
                setIsOpen(true)
            }}
        >
            {<Table></Table>}
        </IconButton>
    </>
}