import { Input } from "antd"
import { useMemo, useState } from "react"
import styled from "styled-components"
import Page from "../shared/components/Page"

const Wrapper = styled(Page)`
    margin-top: 50px;
    font-size: 16px;
    .header {
        margin-bottom: 16px;
    }
    ul {
        list-style: none;
        li {
            margin-bottom: 16px;
            .highlight {
                color: orange;
            }
        }
    }
`

const mockData = [
    '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。满地黄花堆积，憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑！梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！',
    '万事几时足，日月自西东。无穷宇宙，人是一粟太仓中。一葛一裘经岁，一钵一瓶终日，老子旧家风。更著一杯酒，梦觉大槐宫。 记当年，吓腐鼠，叹冥鸿。衣冠神武门外，惊倒几儿童。休说须弥芥子，看取鵾鹏斥鷃，小大若为同。君欲论齐物，须访一枝翁。',
    '予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？ 若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空；日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。'
]

const toHighlight = (reg: RegExp, text: string = '') => {
    return text.replace(reg, '<span class="highlight">$1</span>')
}

export default function SearchHighlight(props: {

}) {
    const [keyword, setKeyword] = useState('')

    const data = useMemo(
        () => {
            if (keyword.length) {
                const regStr = keyword.trim().replace(/([.^$*+?{}\[\]\\|\(\)])/g, '\\$1')
                const reg = new RegExp(`(${regStr})`, 'ig')
                return mockData.map(item => {
                    return toHighlight(reg, item)
                })
            }
            return mockData
        },
        [keyword]
    )

    return (
        <Wrapper>
            <div className="header">
                <Input allowClear placeholder="请输入" value={keyword} onChange={(ev) => setKeyword(ev.target.value)} />
            </div>
            <ul>
                {
                    data.map((text, index) => (<li key={index} dangerouslySetInnerHTML={{ __html: text }}></li>))
                }
            </ul>
        </Wrapper>
    )
}