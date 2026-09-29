import { Button, IconButton, TextField, FormControl , InputLabel } from "@mui/material"
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
            <FormControl size="small" sx={{ mt: 1, width: '45%', mr: 1 }}>
                <TextField
                    type="number"
                    value={rows}
                    inputProps={{
                        min: 0,
                        max: 7,
                    }}
                    onChange={(e) => setRows(Number(e.target.value))}
                    label="Rows"
                />
            </FormControl>

            <FormControl size="small" sx={{ mt: 1, width: '45%' }}>
                <TextField
                    type="number"
                    value={columns}
                    inputProps={{
                        min: 0,
                        max: 7,
                    }}
                    onChange={(e) => setColumns(Number(e.target.value))}
                    label="Columns"
                />
            </FormControl>

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