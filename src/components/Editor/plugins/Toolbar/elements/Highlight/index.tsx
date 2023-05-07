import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Scissors } from '@/components/Icons/Scissors';
import { INSERT_HIGHLIGHT_COMMAND } from '../../../Highlight';


export const Highlight = () => {
    const [editor] = useLexicalComposerContext();

    const onClick = () => editor.dispatchCommand(INSERT_HIGHLIGHT_COMMAND, undefined);

    return (
        <div className="cursor-pointer" onClick={onClick}>
            <Scissors size={24} />
        </div>
    );
};
