import React, { Component } from 'react'


function List(props: { options: string[] }) {
    return (
        <div>
            {
                props.options.map(item => (
                    <div key={item}>{item}</div>
                ))
            }
        </div>
    )
}

export default class index extends Component {
    render() {
        return (
            <div>
                <List key={1} options={['1','2','3']} />
                <List key={2} options={['1','2','3']} />
                <List key={3} options={['1','2','3']} />
            </div>
        )
    }
}
