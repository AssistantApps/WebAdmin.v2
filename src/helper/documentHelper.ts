
export const addScriptToHead = (id: string, url: string, onLoad?: () => void) => {
    const existingScript = document.getElementById(id);
    if (existingScript != null) {
        existingScript.remove();
    }

    try {
        const scriptNode = document.createElement('script');
        scriptNode.id = id;
        scriptNode.type = 'text/javascript';
        scriptNode.async = true;
        if (onLoad != null) {
            scriptNode.onload = onLoad;
        }

        scriptNode.src = url;
        document.head?.appendChild?.(scriptNode);
    }
    catch (err) {
        console.error(err);
    }
};