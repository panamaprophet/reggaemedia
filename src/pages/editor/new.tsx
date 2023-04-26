import { Button } from '@/components/Button';
import Editor from '@/components/Editor';
import { EditorState } from 'lexical';
import { useState } from 'react';


export const NewArticle = () => {
    const [article, setArticle] = useState<EditorState>();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleSave = () => console.log({
        article: article?.toJSON() ?? {},
        title,
        tags,
    })

    return (
        <div>
            <div className="text-right p-2 pt-4">
                <Button type="secondary" onClick={handleSave}>
                    Сохранить
                </Button>
            </div>

            <div className="max-w-full mt-4 m-2 p-2 bg-white rounded border">
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Заголовок"
                    className="max-w-full w-full focus:outline-none text-3xl p-4"
                />

                <input
                    value={tags.join(',')}
                    onChange={(event) => setTags(event.target.value.split(','))}
                    placeholder="Теги"
                    className="max-w-full w-full focus:outline-none text-normal p-4"
                />

                <Editor onChange={setArticle} />
            </div>
        </div>
    );
}

export default NewArticle;
