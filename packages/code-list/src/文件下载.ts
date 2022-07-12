function download(filename: string, data: string) {
    const base64ToBlob = function(code: string) {
        const parts = code.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
          type: contentType
        });
      };
    const a = document.createElement('a')
    if (/^data:.+;base64/.test(content)) {
        const blob = base64ToBlob(content);
        a.href = URL.createObjectURL(blob);
    } else {
        a.href = content
    }
    const url = URL.createObjectURL(new Blob([data]))
    a.download = filename
    a.rel = 'noopener'
    a.href = url
    a.click()
    a.remove()
}