import styled from "styled-components"
import { GridView } from "../components/gridview"
import Page from "../shared/components/Page"

const Wrapper = styled(Page)`
    margin-top: 64px;
    .item {
        background-color: #eee;
    }
`

const poetries = [
    '日照香炉生紫烟，遥看瀑布挂前川。 飞流直下三千尺，疑是银河落九天。',
    '朝辞白帝彩云间，千里江陵一日还。 两岸猿声啼不住，轻舟已过万重山。',
    '春眠不觉晓，处处闻啼鸟。 夜来风雨声，花落知多少。',
    '国破山河在，城春草木深。 感时花溅泪，恨别鸟惊心。 烽火连三月，家书抵万金。 白头搔更短，浑欲不胜簪。'
]

export default function GridviewPage() {
    return (
        <Wrapper>
            <GridView columns={3}>
                {
                    poetries.map((poetry, index) => {
                        return (
                            <div className="item" key={index}>{poetry}</div>
                        )
                    })
                }
            </GridView>
        </Wrapper>
    )
}