import './App.less'
import Card from './components/Card'
import { HashRouter, Route, Routes } from 'react-router-dom';
import config from './config'
import useViewport, { Breakpoints } from './hooks/useViewport';
import useMatchMedia from './hooks/useMatchMedia';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {
            config.map(item => {
              return (
                <Route key='logic' path={item.path} element={item.element} />
              )
            })
          }
          <Route key='/' path='/' element={<div className="grid">
              {
                config.map(item => {
                  return (
                    <Card key={item.title} {...item} />
                  )
                })
              }
              <i className='card placeholder'></i>
              <i className='card placeholder'></i>
              <i className='card placeholder'></i>
            </div>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
