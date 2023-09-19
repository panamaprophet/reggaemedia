import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';


export const TreeViewPlugin = () => {
    const [editor] = useLexicalComposerContext();
    return (
        <TreeView
            viewClassName="tree-view-output"
            timeTravelPanelClassName="debug-timetravel-panel"
            timeTravelButtonClassName="debug-timetravel-button"
            timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
            timeTravelPanelButtonClassName="debug-timetravel-panel-button"
            treeTypeButtonClassName="debug-tree-type-button"
            editor={editor}
        />
    );
}
