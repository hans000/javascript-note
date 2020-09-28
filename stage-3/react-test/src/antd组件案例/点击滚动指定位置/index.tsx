import React, { Component } from 'react'

export default class index extends Component {
    private clickHandle = (id: string) => () => {
        const element = document.getElementById(id);
        element.scrollIntoView();
    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <div style={{ fontSize: 14 }}>重命名文件</div>
                        <div style={{ fontSize: 12 }}>原命名文件</div>
                    </div>
                </div>
                {/* <div style={{ position: 'fixed', top: 0, width: 200, height: 200 }}>
                    <div onClick={this.clickHandle('cont1')}>click me</div>
                    <div onClick={this.clickHandle('cont2')}>click me</div>
                    <div onClick={this.clickHandle('cont3')}>click me</div>
                    <div onClick={this.clickHandle('cont4')}>click me</div>
                    <div onClick={this.clickHandle('cont5')}>click me</div>
                    <div onClick={this.clickHandle('cont6')}>click me</div>
                </div>
                <div style={{ marginLeft: 200 }} className="cont">
                    <div id='cont1' key='cont1' style={{ height: 300, borderBottom: '1px solid #eee' }}>内容1</div>
                    <div id='cont2' key='cont2' style={{ height: 300, borderBottom: '1px solid #eee' }}>内容2</div>
                    <div id='cont3' key='cont3' style={{ height: 300, borderBottom: '1px solid #eee' }}>内容3</div>
                    <div id='cont4' key='cont4' style={{ height: 300, borderBottom: '1px solid #eee' }}>内容4</div>
                    <div id='cont5' key='cont5' style={{ height: 300, borderBottom: '1px solid #eee' }}>内容5</div>
                    <div id='cont6' key='cont6' style={{ height: 300, borderBottom: '1px solid #eee' }}>内容6</div>
                </div> */}
            </div>
        )
    }
}
