'use client';
import Button from '@/app/_components/ui/button';
import ContainerInput from '@/app/_components/ui/inputs/container-input';
import { TBasePropsInput, TCustomeEventOnChange } from '@/types/ui';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, EditorContentProps, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import { ChangeEvent, memo, useMemo, useRef } from 'react';

export type TListToolbar =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'horizontalRule'
  | 'link'
  | 'image'
  | 'video'
  | 'table'
  | 'tableRow'
  | 'tableCell'
  | 'highlight'
  | 'subscript'
  | 'superscript'
  | 'mention'
  | 'taskList'
  | 'undo'
  | 'redo'
  | 'textColor'
  | '';
export interface TPropsInputTextEditor
  extends TBasePropsInput,
    Omit<EditorContentProps, 'onChange' | 'editor'> {
  onChange: (e: TCustomeEventOnChange<string>) => void;
  name: string;
  placeholder?: string;
  listToolbarShowed?: TListToolbar[];
}

const InputTextEditor = (props: TPropsInputTextEditor) => {
  const {
    errorMessage,
    placeholder,
    name,
    onChange,
    label,
    listToolbarShowed = [
      'bold',
      'italic',
      'underline',
      'textColor',
      'orderedList',
      'bulletList',
      'undo',
      'redo',
    ],
  } = props;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: placeholder,
      }),
      Text,
      TextStyle,
      Color,
    ],
    editorProps: {
      attributes: {
        class: `text-editor mt-2 min-h-[6rem] outline-none border px-3 py-2 focus:border-primary ${errorMessage && 'border-error'}`,
      },
    },
    onUpdate: ({ editor }) => {
      const isMmptyValue = editor.getHTML() === '<p></p>' || !editor.getHTML();
      onChange({
        target: {
          name,
          value: isMmptyValue ? '' : editor.getHTML(),
        },
      });
    },
  });

  return (
    <ContainerInput
      customeClass={{
        ciV2: ' !p-0 !rounded-lg border-none',
      }}
      isClerable={false}
      errorMessage={errorMessage}
      label={label}
    >
      {editor && <Toolbar editor={editor} listToolbarShowed={listToolbarShowed} />}

      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </ContainerInput>
  );
};

interface TPropsToolbar {
  editor: Editor;
  listToolbarShowed: TListToolbar[];
}

const Toolbar = memo((props: TPropsToolbar) => {
  const { editor, listToolbarShowed } = props;
  const refInputColor = useRef<HTMLInputElement | null>(null);
  const listButton = useMemo(
    () => [
      {
        name: 'bold',
        icon: <Bold className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
      },
      {
        name: 'italic',
        icon: <Italic className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
      },
      {
        name: 'underline',
        icon: <UnderlineIcon className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
      },
      {
        name: 'strike',
        icon: <Strikethrough className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
      },
      {
        name: 'bulletList',
        icon: <List className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
      },
      {
        name: 'orderedList',
        icon: <ListOrdered className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        name: 'blockquote',
        icon: <Quote className="w-5 h-5" />,
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
      },
      {
        name: 'code',
        icon: <Code className="w-5 h-5" />,
        onClick: () => editor.chain().focus().setCode().run(),
      },
      {
        name: 'undo',
        icon: <Undo className="w-5 h-5" />,
        onClick: () => editor.chain().focus().undo().run(),
      },
      {
        name: 'redo',
        icon: <Redo className="w-5 h-5" />,
        onClick: () => editor.chain().focus().redo().run(),
      },
    ],
    [editor],
  );

  const handleOnClickBtn = (e: React.MouseEvent<HTMLButtonElement>, onClick: () => void) => {
    e?.preventDefault();
    onClick();
  };

  const handleOnChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    return editor.chain().focus().setColor(e.target.value).run();
  };

  return (
    <div className="flex gap-2">
      {listButton?.map((btn, i) => (
        <Button
          key={i}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClickBtn(e, btn.onClick)}
          variant={editor.isActive(btn.name) ? 'solid-primary' : 'soft-primary'}
          className={`!p-1 ${!listToolbarShowed?.includes(btn.name as TListToolbar) && 'hidden'}`}
        >
          {btn.icon}
        </Button>
      ))}
      {listToolbarShowed.includes('textColor') && (
        <div className="relative">
          <input
            ref={refInputColor}
            type="color"
            onChange={handleOnChangeColor}
            value={editor.getAttributes('textStyle').color || '#000000'}
            data-testid="setColor"
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
});

Toolbar.displayName = 'Toolbar';
export default InputTextEditor;
