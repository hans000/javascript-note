import React, { Component } from 'react'
import HsSelect from './HsSelect'

const options = [
    { title: 'HsSelect', value: 'HsSelect' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5', value: '5' },
    { title: '6', value: '6' },
    { title: '7', value: '7' },
    { title: '8', value: '8' },
]

export default class index extends Component {
    render() {
        return (
            <div>
                <HsSelect style={{ width: 200 }} maxCount={2} options={options}></HsSelect>
            </div>
        )
    }
}
