import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  ListNode,
  $createListItemNode,
  REMOVE_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from 'lexical';
import { $getNearestNodeOfType } from '@lexical/utils';
import { CustomBulletListNode } from '../Nodes/CustomBulletListNode';

type CustomListPluginProps = {
  className: string;
  icon: React.ReactNode;
  label: string;
};

export function CustomListPlugin({ className, icon, label }: CustomListPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const listNode = $getNearestNodeOfType(anchorNode, ListNode);

          setIsActive(
            !!listNode &&
              listNode.getType() === CustomBulletListNode.getType() &&
              (listNode as CustomBulletListNode).getClassName() === className
          );
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, className]);

  const toggleBulletList = useCallback(() => {
    editor.update(() => {
      if (isActive) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        return;
      }

      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);

      const updatedSelection = $getSelection();
      if (!$isRangeSelection(updatedSelection)) return;

      const anchorNode = updatedSelection.anchor.getNode();
      const listNode = $getNearestNodeOfType(anchorNode, ListNode);

      if (listNode && listNode.getType() === 'list') {
        const customListNode = new CustomBulletListNode(
          listNode.getListType(),
          listNode.getStart(),
          className
        );
        listNode.getChildren().forEach((child) => customListNode.append(child));
        listNode.replace(customListNode);
      } else if (listNode && listNode.getType() === CustomBulletListNode.getType()) {
        (listNode as CustomBulletListNode).setClassName(className);
      }
    });
  }, [editor, isActive, className]);

  return (
    <button
      type='button'
      onMouseDown={(e) => e.preventDefault()}
      onClick={toggleBulletList}
      className={isActive ? 'toolbar-item active' : 'toolbar-item'}
      aria-label={label}
    >
      {icon}
    </button>
  );
}