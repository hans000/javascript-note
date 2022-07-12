import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom'

interface IProps {

}
export function fileDownload(downloadUrl: string, fileName = '') {
    const TOKEN = sessionStorage.getItem('token');
    const xhr = new XMLHttpRequest()
    xhr.open('GET', downloadUrl)
    xhr.setRequestHeader('TOKEN', TOKEN)
    xhr.responseType = 'blob'
    xhr.onreadystatechange = () => {
        try {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                const disposition = decodeURI(xhr.getResponseHeader('content-disposition'))
                if (window.navigator.msSaveOrOpenBlob) {
                    const blob = new Blob([xhr.response])
                    window.navigator.msSaveOrOpenBlob(blob, fileName)
                    return
                }
                const src = URL.createObjectURL(xhr.response)
                const a = document.createElement('a');
                a.href = src;
                a.download = fileName
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        } catch (err) {
            console.error(err)
        }
    }
    xhr.send()
}
export default class index extends Component<IProps, {}> {
    private download = () => {
        const url = '1.xlsx'
        fileDownload(url, 'foo.xlsx')
    }
    public componentDidMount() {
        window.addEventListener("popstate", (e) => { 
        　　alert(1)
        }, false)
    }
    render() {
        return (
            <Router>
                <Route exact path='/' render={() => <h2>首页</h2>}></Route>
                <Route path='/foo' render={() => <h2>foo</h2>}></Route>
                <Route path='/bar' render={() => <h2>bar</h2>}></Route>

                <a onClick={this.download}>下载</a>
                <Link to='/'>首页</Link>
                <Link to='/foo'>foo</Link>
                <Link to='bar'>bar</Link>
            </Router>
        )
    }
}
