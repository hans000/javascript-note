function createMarkers(pos, count=10) {
  const markers = []
  for (let i = -count; i < count; i++) {
    for (let j = -count; j < count; j++) {
        const marker = new AMap.Marker({
            position: new AMap.LngLat(pos[0] + 0.003 * i, pos[1] + 0.003 * j),
            title: `marker ${i} ${j}`,
        })
        markers.push(marker)
    }
  }
  return markers
}

function createInstance(map, markers) {
    const circleEditor = new AMap.CircleEditor(map)
    let curr = null, showMarkers = []

    const btnDel = () => {
        if (curr) {
            map.remove(showMarkers)
            circleEditor.close()
            map.remove(curr)
        }
    }
    const btnAdd = () => {
        btnDel()
        circleEditor.close()
        circleEditor.setTarget()
        circleEditor.open()
    }
    const btnFit = () => map.setFitView()
    circleEditor.on('add', (e) => {
        curr = e.target
        updateMarkers()
    })

    circleEditor.on('adjust', updateMarkers)
    circleEditor.on('move', updateMarkers)

    function updateMarkers() {
        map.remove(showMarkers)
        showMarkers = getMarkers()
        map.add(showMarkers)
    }
    function getMarkers() {
      const result = []
      markers.forEach(m => {
        const pos = m.getPosition()
        if (curr.contains(pos)) {
          result.push(m)
        }
      })
      return result
    }
    return {
        btnAdd,
        btnDel,
        btnFit,
    }
}