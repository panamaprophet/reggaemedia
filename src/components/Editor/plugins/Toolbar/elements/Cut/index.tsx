import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_CUT_COMMAND } from '../../../Cut';
import { Scissors } from '@/components/Icons/Scissors';


export const Cut = () => {
    const [editor] = useLexicalComposerContext();

    const onClick = () => editor.dispatchCommand(INSERT_CUT_COMMAND, undefined);

    return (
        <div className="cursor-pointer" onClick={onClick}>
            <Scissors size={24} />
        </div>
    );
};
