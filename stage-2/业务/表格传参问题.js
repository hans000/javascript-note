

const row = [
    { value: 1, title: '行1', id: 1000001 },
    { value: 2, title: '行2', id: 1000001 },
    { value: 3, title: '行3', id: 1000001 },
    { value: 4, title: '行4', id: 1000001 },
]
const col = [
    { value: 1, title: '列1', id: 1000011 },
    { value: 2, title: '列2', id: 1000011 },
    { value: 3, title: '列3', id: 1000011 },
    { value: 4, title: '列4', id: 1000011 },
    { value: 5, title: '列5', id: 1000011 },
    { value: 6, title: '列6', id: 1000011 },
]
/**
 * 0 0 1 0 0 0
 * 0 2 0 0 0 0
 * 0 0 3 4 0 0
 * 0 0 0 0 0 0
 */
// 后台数据
const reqData = [
    { colId: 3, colParentId: 1000011, rowId: 1, rowParentId: 100001, value: 1 },
    { colId: 2, colParentId: 1000011, rowId: 2, rowParentId: 100001, value: 2 },
    { colId: 3, colParentId: 1000011, rowId: 3, rowParentId: 100001, value: 3 },
    { colId: 4, colParentId: 1000011, rowId: 3, rowParentId: 100001, value: 4 },
]
function getRandID() {
    return Math.random().toString(36).slice(2)
}
function buildTableData() {
    const result = []
    let pt = 0
    let has = true
    for (let i = 0; i < row.length; i++) {
        const obj = { id: getRandID(), row: row[i].title }
        for (let j = 0; j < col.length; j++) {
            obj[col[j].value] = '请输入'
            if (has && row[i].value === reqData[pt].rowId && col[j].value === reqData[pt].colId) {
                obj[col[j].value] = reqData[pt].value
                reqData.length - 1 === pt ? (has = false) : pt++ 
            }
        }
        result.push(obj)
    }
    return result
}

console.log(buildTableData());
