import { Button } from "antd";
import styled from "styled-components";
import useAnimateEnter from "../hooks/useAnimateEnter";
import Page from "../shared/components/Page";
import { formatPoetry } from "../tools";

const Wrapper = styled(Page)`
    .item {
        text-align: center;
        margin-bottom: 64px;
        h2 {
            font-size: 32px;
        }
        h3 {
            font-size: 24px;
        }
        p {
            font-size: 20px;
        }
    }
    .es-enter {
        opacity: 0;
        animation: es-enter .5s 1 forwards;
    }
    .es-enter-mark,
    .es-enter-out {
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes es-enter {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: none;
        }
    }
`

const data = [
    {
        title: '望庐山瀑布',
        author: '李白',
        text: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
    },
    {
        title: '短歌行',
        author: '李白',
        text: '白日何短短，百年苦易满。苍穹浩茫茫，万劫太极长。麻姑垂两鬓，一半已成霜。天公见玉女，大笑亿千场。吾欲揽六龙，回车挂扶桑。北斗酌美酒，劝龙各一觞。富贵非所愿，与人驻颜光。',
    },
    {
        title: '春夜喜雨',
        author: '杜甫',
        text: '好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。',
    }
]

export default function AnimateEnter() {
    const ref = useAnimateEnter<HTMLDivElement>()
    return (
        <Wrapper>
            <div style={{ margin: 32, textAlign: 'center' }}>
                <Button type='primary' onClick={() => {
                    location.reload()
                }}>重新加载页面</Button>
            </div>
            <div ref={ref}>
                {
                    data.map(item => {
                        return (
                            <div className="item" key={item.title}>
                                <h2 className="es-enter-mark">{item.title}</h2>
                                <h3 className="es-enter-mark">{item.author}</h3>
                                {
                                    formatPoetry(item.text).map(line => {
                                        return (
                                            <p className="es-enter-mark" key={line}>{line}</p>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </Wrapper>
    )
}