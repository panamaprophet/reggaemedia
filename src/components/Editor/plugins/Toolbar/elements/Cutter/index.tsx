import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Scissors } from '@/components/Icons/Scissors';
import { INSERT_CUTTER_COMMAND } from '../../../Cutter';


export const Cutter = () => {
    const [editor] = useLexicalComposerContext();

    const onClick = () => editor.dispatchCommand(INSERT_CUTTER_COMMAND, undefined);

    return (
        <div className="cursor-pointer" onClick={onClick}>
            <Scissors size={24} />
        </div>
    );
};
