import styled from "styled-components";
import DropDown from "../components/dropdown";
import Page from "../shared/components/Page";

const Wrapper = styled(Page)`
    .scoll-container {
        display: flex;
        width: 200px;
        margin-bottom: 24px;
        overflow-x: auto;
        .item {
            flex: 0 0 60px;
        }
    }
`

export default function DropdownPage() {
    return (
        <Wrapper>
            <h2>三种属性展示</h2>
            <div style={{ textAlign: 'center' }}>
                <DropDown position="full" label={'full 撑满页面'}>
                    <div>
                        <p>1111111111</p>
                        <p>222222222222</p>
                    </div>
                </DropDown>
                <DropDown position="before" label={'before 和元素左对齐'}>
                    <div>
                        <p>1111111111</p>
                        <p>222222222222</p>
                    </div>
                </DropDown>
                <DropDown position="after" label={'--- after 和元素右对齐 ---'}>
                    <div>
                        <p>1111111111</p>
                        <p>222222222222</p>
                    </div>
                </DropDown>
                <DropDown position="after" disbled label={'--- disabled ---'}>
                    <div>
                        <p>1111111111</p>
                        <p>222222222222</p>
                    </div>
                </DropDown>
                <DropDown position="after" trigger="hover" label={'--- hover trigger ---'}>
                    <div>
                        <p>1111111111</p>
                        <p>222222222222</p>
                    </div>
                </DropDown>
            </div>
            <br />
            <h2>在滚动容器内的效果</h2>
            <div className="scoll-container">
                <div className="item">a</div>
                <div className="item">b</div>
                <DropDown position="before" label={'clickme'}>
                    <div style={{ backgroundColor: '#fff', height: 200 }}>
                        <p onClick={(ev) => {
                            ev.stopPropagation()
                            console.log(11)
                        }}>click me</p>
                        <p onClick={() => {
                            console.log(222)
                        }}>222222222222</p>
                    </div>
                </DropDown>
                <div className="item">c</div>
                <div className="item">d</div>
            </div>
            <div className="scoll-container">
                <div className="item">a</div>
                <div className="item">b</div>
                <DropDown position="after" label={'clickme'}>
                    <div style={{ backgroundColor: '#fff', height: 200 }}>
                        <p onClick={(ev) => {
                            ev.stopPropagation()
                            console.log(11)
                        }}>click me</p>
                        <p onClick={() => {
                            console.log(222)
                        }}>222222222222</p>
                    </div>
                </DropDown>
                <div className="item">c</div>
                <div className="item">d</div>
            </div>
            <div className="scoll-container">
                <div className="item">a</div>
                <div className="item">b</div>
                <DropDown position="full" label={'clickme'}>
                    <div style={{ backgroundColor: '#fff', height: 200 }}>
                        <p onClick={(ev) => {
                            ev.stopPropagation()
                            console.log(11)
                        }}>click me</p>
                        <p onClick={() => {
                            console.log(222)
                        }}>222222222222</p>
                    </div>
                </DropDown>
                <div className="item">c</div>
                <div className="item">d</div>
            </div>
        </Wrapper>
    )
}