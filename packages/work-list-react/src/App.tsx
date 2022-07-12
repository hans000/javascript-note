import { Menu } from 'antd'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Home from './pages'
import AnchorPage from './pages/anchor'
import AnimateEnter from './pages/animate-enter'
import GridviewPage from './pages/gridview'
import InfiniteScroll from './pages/infinite-scroll'
import MultiPagesStateSync from './pages/multi-pages-state-sync'
import MultiTextPage from './pages/multi-text'
import ScrollContainerPage from './pages/scroll-container'
import SearchHighlight from './pages/search-highlight'

const config: Array<{
  label: string
  key: string
  component: React.ReactElement
}> = [
  { label: '首页', key: '/home', component: <Home /> },
  { label: '锚点定位', key: '/anchor', component: <AnchorPage /> },
  { label: '高亮搜索', key: 'search-highlight', component: <SearchHighlight /> },
  { label: '多页面通讯', key: 'multi-pages-state-sync', component: <MultiPagesStateSync /> },
  { label: 'grid布局', key: 'gridview', component: <GridviewPage /> },
  { label: '加载动画', key: 'animate-enter', component: <AnimateEnter /> },
  { label: '多行文本省略', key: 'multi-text', component: <MultiTextPage /> },
  { label: '无限滚动', key: 'infiniate-scroll', component: <InfiniteScroll /> },
  { label: '滚动容器', key: 'scroll-container', component: <ScrollContainerPage /> },
]

const Wrapper = styled.div`
  header {
    z-index: 1;
    position: sticky; 
    top: 0;
    background-color: #fff;
  }
`

const items = config.map(item => ({ label: item.label, key: item.key }))

function App() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <header>
        <Menu onClick={(ev) => {
          navigate(ev.key)
        }} mode='horizontal' items={items} />
      </header>
      <Routes>
        {
          config.map(item => {
            return (
              <Route path={item.key} key={item.key} element={item.component} />
            )
          })
        }
        <Route path='*' element={<Home />} />
      </Routes>
    </Wrapper>
  )
}

export default App
