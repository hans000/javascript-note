import React, { Component } from 'react'

function Child() {
    return (
        <span>1</span>
    )
}

export default class index extends Component {
    private data: any[] = [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 },
    ]
    render() {
        return (
            <div>
                {
                    this.data.map((e, i) => {
                        return (
                            <Child key={i} />
                        )
                    })
                }
                {
                    this.data.map((el, index) => {
                        return (
                            <Child key={index} />
                        )
                    })
                }
            </div>
        )
    }
}
