
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

export const downloadContentAsFile = (filename: string, fileContent: string) => {
    const anchorElem = document.createElement('a');
    anchorElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    anchorElem.setAttribute('download', filename);

    anchorElem.style.display = 'none';
    document.body.appendChild(anchorElem);

    anchorElem.click();

    document.body.removeChild(anchorElem);
}