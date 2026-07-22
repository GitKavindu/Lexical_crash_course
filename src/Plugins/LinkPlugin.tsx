import { Button, IconButton, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { Link, Table } from "react-bootstrap-icons"
import Modal from "../Components/Modal"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createLinkNode, $toggleLink, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $getSelection, $isRangeSelection, $setSelection, RangeSelection } from "lexical";

export function LinkPlugin() {
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState<string>("https://");
    const [editor] = useLexicalComposerContext();
    const savedSelection = useRef<RangeSelection | null>(null);

    // Keep track of the last non-null range selection at all times,
    // so it survives focus moving to the modal/input.
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    savedSelection.current = selection.clone();
                }
            });
        });
    }, [editor]);

    const onAddLink = () => {
        const normalized = normalizeUrl(url);
        if (!normalized) return;

        editor.update(() => {
            if (savedSelection.current) {
                $setSelection(savedSelection.current);
            }
            $toggleLink(normalized);
        });

        setUrl("");
        setIsOpen(false);
    };

    function normalizeUrl(value: string): string | null {
        let url = value.trim();

        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }

        try {
            return new URL(url).toString();
        } catch {
            return null;
        }
    }

    return <>
        {isOpen && (
            <Modal
                title="Add Link"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                footer={<Button disabled={!url} onClick={onAddLink}>Add</Button>}
            >
                <TextField
                    type="text"
                    size="small"
                    value={url}
                    placeholder="set url"
                    sx={{ mt: 1, width: '100%' }}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </Modal>
        )}
        <IconButton
            aria-label="Add Link"
            size="small"
            onClick={() => setIsOpen(true)}
        >
            <Link />
        </IconButton>
    </>;
}