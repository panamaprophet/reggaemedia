

const isString = (data: unknown): data is string => typeof data === 'string';

export const uploadFile = async (file: File): Promise<string | null> => {
    try {
        const name = encodeURIComponent(file.name);
        const response = await fetch(`/api/upload/${name}`);
        const { url } = await response.json();

        await fetch(url, { method: 'PUT', body: file });

        return url.split('?')[0];
    } catch (error) {
        console.log('error during upload', error);

        return null;
    }
};

export const uploadMultiple = async (files: File[]): Promise<string[]> => {
    const promises = files.map(uploadFile);
    const urls = await Promise.all(promises);

    return urls.filter(isString);
};
