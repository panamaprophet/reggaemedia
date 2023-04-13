import Editor from "@/components/Editor";
import { EditorState } from "lexical";
import { useRef } from "react";

export const NewArticle = () => {
    const ref = useRef<EditorState>();
    const tags = ['qwe', 'asd', 'zxc'];

    const handleSave = () => console.log(JSON.stringify(ref))

    return (
        <div className='flex self-center flex-col items-center justify-evenly max-w-4xl bg-slate-600 gap-2'>
            <input className="p-2 text-xl font-bold" type="text" placeholder="Start typing article header"></input>
            <div className='flex gap-1 items-center justify-center'>
                {tags.map((tag) => <div key={tag + Math.random()}>{tag}</div>)}
                <input className="p-2 text-m" type="text" placeholder="Start typing tags"></input>
            </div>
            <div className="w-full mt-4 bg-white rounded border">
                <Editor onChange={(state) => ref.current = state} />
            </div>
            <button className="border p-2 rounded bg-slate-200" onClick={handleSave}>Save</button>
        </div>
    );
}

export default NewArticle;
