import { getArticle, saveArticle } from '@/actions/articles';
import { formatArticleDate, normalize } from '@/helpers/article';
import { Article } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSaving = (article: Article) => {
    const router = useRouter();
    const [state, setState] = useState(article);
    const [isSaving, setSaving] = useState(false);
    const [isAutoSaving, setAutoSaving] = useState(false);
    const [savedTime, setSavedTime] = useState('');
    
    const _onSave = async (data: Article) => {
        const hasId = Boolean(data.id);
        const body = { root: normalize(data.body.root) };
        const id = await saveArticle({ ...data, body });

        if (!hasId) {
            router.replace(`/editor/${id}`, undefined, { shallow: true });
            setState({ ...data, id });
        }

        const response = await getArticle(id);

        setState({ ...state, updatedOn: response.article.updatedOn });
    };

    const onAutoSave = async () => {
        setAutoSaving(true);

        await _onSave(state);

        setAutoSaving(false);
    }

    const onSave = async () => {
        setSaving(true);

        await _onSave(state);

        setSaving(false);
    }

    useEffect(() => {
        if (!isSaving || !isAutoSaving) {
            setSavedTime(formatArticleDate(state, true));
        }
    }, [isSaving, isAutoSaving, state]);

    return [state, { isAutoSaving, isSaving, savedTime }, onSave, onAutoSave, setState] as const;
}
