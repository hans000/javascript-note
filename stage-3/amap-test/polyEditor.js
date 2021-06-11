function createPolyEditorInstance(map) {
    const polygon = new AMap.Polygon({
        path: [],
        strokeColor: "#FF33FF", 
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50,
    })
    const polyEditor = new AMap.PolyEditor(map, polygon)
    let curr = null

    const getPath = () => {
        return curr
    }

    const btnDel = () => {
        if (curr) {
            polyEditor.close()
            map.remove(curr)
        }
    }
    const btnAdd = () => {
        btnDel()
        polyEditor.close()
        polyEditor.setTarget()
        polyEditor.open()
    }
    const btnFit = () => map.setFitView()
    polyEditor.on('add', (e) => {
        curr = e.target
    })
    return {
        btnAdd,
        btnDel,
        btnFit,
        getPath,
    }
}