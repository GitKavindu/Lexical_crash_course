// CustomListNode.ts
import { ListNode, SerializedListNode } from '@lexical/list';
import type { LexicalNode, EditorConfig, LexicalEditor } from 'lexical';

type SerializedCustomBulletListNode = SerializedListNode & {
  className: string;
};

export class CustomBulletListNode extends ListNode {
  __className: string;

  constructor(listType: 'bullet', start: number, className = 'editor-list-ul-custom', key?: string) {
    super(listType, start, key);
    this.__className = className;
  }

  static getType() {
    return 'custom-bullet-list';
  }

  static clone(node: CustomBulletListNode) {
    return new CustomBulletListNode(
      node.__listType,
      node.__start,
      node.__className,
      node.__key
    );
  }

  createDOM(config: EditorConfig, editor: LexicalEditor) {
    const dom = super.createDOM(config, editor);
    dom.classList.add(this.__className);
    return dom;
  }

  setClassName(className: string) {
    const self = this.getWritable();
    self.__className = className;
  }

  getClassName() {
    return this.__className;
  }

  static importJSON(serializedNode: SerializedCustomBulletListNode) {
    return new CustomBulletListNode(
      'bullet',
      serializedNode.start,
      serializedNode.className
    );
  }

  exportJSON(): SerializedCustomBulletListNode {
    return {
      ...super.exportJSON(),
      type: CustomBulletListNode.getType(),
      className: this.__className,
    };
  }

static importDOM() {
  return {
    ul: (node: Node) => {
      const element = node as HTMLElement;

      if (!element.classList.contains("editor-list-ul-custom") &&
          !element.classList.contains("editor-list-ul-star")) {
        return null;
      }

      return {
        conversion: () => {
          const className = element.classList.contains("editor-list-ul-star")
            ? "editor-list-ul-star"
            : "editor-list-ul-custom";

          return {
            node: new CustomBulletListNode(
              "bullet",
              1,
              className
            ),
          };
        },
        priority: 4,
      };
    },
  };
}
}