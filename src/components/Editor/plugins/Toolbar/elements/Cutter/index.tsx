import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Scissors } from '@/components/Icons/Scissors';
import { INSERT_CUTTER_COMMAND } from '../../../Cutter';
import { Item } from '../Item';


export const Cutter = () => {
    const [editor] = useLexicalComposerContext();

    const onClick = () => editor.dispatchCommand(INSERT_CUTTER_COMMAND, undefined);

    return (
        <Item
            title="Вставить разрыв"
            onClick={onClick}
        >
            <Scissors />
        </Item>
    );
};
