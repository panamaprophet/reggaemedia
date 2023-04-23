import { Align } from './elements/Align';
import { Image } from './elements/Image';
import { UndoRedo } from './elements/UndoRedo';
import { FontSizeDropDown } from './elements/FontDropDown';
import { BlockFormatDropDown } from './elements/BlockFormat';
import { Bold, Italic, Link, Underline } from './elements/Formatting';


export const ToolbarPlugin = () => {
    return (
        <div className="flex items-center justify-between p-1 sticky">
            <UndoRedo />
            <BlockFormatDropDown />
            <FontSizeDropDown />
            <Bold />
            <Italic />
            <Underline />
            <Link />
            <Align />
            {/* eslint-disable-next-line */}
            <Image />
        </div>
    );
};
