import { Align } from './elements/Align';
import { UndoRedo } from './elements/UndoRedo';
import { FontSizeDropDown } from './elements/FontDropDown';
import { BlockFormatDropDown } from './elements/BlockFormat';
import { Bold, Italic, Link, Underline } from './elements/Formatting';
import { Cutter } from './elements/Cutter';
import { Embed } from './elements/Embed';
import { Image as ImageButton } from './elements/Image';


export const ToolbarPlugin = () => {
    return (
        <div className="flex items-center justify-between mx-4 py-4 sticky z-10 top-0 border-b border-gray-200 bg-white">
            <UndoRedo />
            <BlockFormatDropDown />
            <FontSizeDropDown />
            <Bold />
            <Italic />
            <Underline />
            <Link />
            <Align />
            <ImageButton />
            <Cutter />
            <Embed />
        </div>
    );
};
