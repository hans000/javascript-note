
import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
    render() {
        return (
            <div className='hr-flex-cont' style={{ margin: 50 }}>
                <div className="hr-flex__r-wrap">
                    <div className="hr-flex__r-wrap-left">
                        <div className='hr-flex-item hr-flex__r-wrap-item'>姓名</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'></div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>性别</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>出生年月<br/>（岁）</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>民族</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>汉</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>籍贯</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>出生地</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>入党时间</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>参与工作时间</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>健康状况</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>专业技术职务</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item2 editable'>1</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item'>熟悉专业<br />有何特长</div>
                        <div className='hr-flex-item hr-flex__r-wrap-item2 editable'>1</div>
                    </div>
                    <div className="hr-flex__r-wrap-right">
                        图片
                    </div>
                </div>

                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className='hr-flex-item'>学历<br />学位</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className='hr-flex-item hr-flex__l-wrap-item'>全日制教育</div>
                        <div className='hr-flex-item hr-flex__l-wrap-item2 hr-flex__both'>
                            <div className='editable hr-flex__both--item'>本科</div>
                            <div className='editable hr-flex__both--item'>学士</div>
                        </div>
                        <div className='hr-flex-item hr-flex__l-wrap-item'>毕业院校<br />系及专业</div>
                        <div className='hr-flex-item hr-flex__l-wrap-item3 hr-flex__both'>
                            <div className='editable hr-flex__both--item'>本科</div>
                            <div className='editable hr-flex__both--item'>学士</div>
                        </div>
                        <div className='hr-flex-item hr-flex__l-wrap-item'>在职教育</div>
                        <div className='hr-flex-item hr-flex__l-wrap-item2 hr-flex__both'>
                            <div className='editable hr-flex__both--item'>本科</div>
                            <div className='editable hr-flex__both--item'>学士</div>
                        </div>
                        <div className='hr-flex-item hr-flex__l-wrap-item'>毕业院校<br />系及专业</div>
                        <div className='hr-flex-item hr-flex__l-wrap-item3 hr-flex__both'>
                            <div className='editable hr-flex__both--item'>本科</div>
                            <div className='editable hr-flex__both--item'>学士</div>
                        </div>
                    </div>
                </div>

                <div className='hr-flex__r-wrap2'>
                    <div className='hr-flex-item hr-flex__r-wrap2-item'>现任职务</div>
                    <div className='hr-flex-item hr-flex__r-wrap2-itemx editable'>1</div>
                    <div className='hr-flex-item hr-flex__r-wrap2-item'>拟任职务</div>
                    <div className='hr-flex-item hr-flex__r-wrap2-itemx editable'>1</div>
                    <div className='hr-flex-item hr-flex__r-wrap2-item'>免任职务</div>
                    <div className='hr-flex-item hr-flex__r-wrap2-itemx editable'>1</div>
                </div>

                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className="hr-flex-item">简历</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className="hr-flex-item hr-flex-text">123</div>
                    </div>
                </div>
                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className="hr-flex-item">奖惩情况</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className="hr-flex-item hr-flex-text">奖惩情况</div>
                    </div>
                </div>
                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className="hr-flex-item">年度考核结果</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className="hr-flex-item hr-flex-text">年度考核结果</div>
                    </div>
                </div>
                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className="hr-flex-item">任免理由</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className="hr-flex-item">任免理由</div>
                    </div>
                </div>
                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className="hr-flex-item">家庭主要成员及重要社会关系</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className="hr-flex__l-wrap-right">
                            <div className='hr-flex-item hr-flex__l-wrap-item'>称谓</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>姓名</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>出生日期</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>政治面貌</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item3'>工作单位及职位</div>

                            <div className='hr-flex-item hr-flex__l-wrap-item'>1</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>2</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>3</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>4</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item3'>5</div>

                            <div className='hr-flex-item hr-flex__l-wrap-item'>1</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>2</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>3</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item'>4</div>
                            <div className='hr-flex-item hr-flex__l-wrap-item3'>5</div>
                        </div>
                        
                    </div>
                </div>
                <div className="hr-flex__l-wrap">
                    <div className="hr-flex__l-wrap-left">
                        <div className="hr-flex-item">呈报单位</div>
                    </div>
                    <div className="hr-flex__l-wrap-right">
                        <div className="hr-flex-item">呈报单位</div>
                    </div>
                </div>

                <div className='hr-flex'>
                    <div className='hr-flex-item'>身份证明</div>
                    <div className='hr-flex-item editable'></div>
                    <div className='hr-flex-item'>计算年龄时间</div>
                    <div className='hr-flex-item editable'></div>
                    <div className='hr-flex-item'>填表时间</div>
                    <div className='hr-flex-item editable'></div>
                    <div className='hr-flex-item'>填表人</div>
                    <div className='hr-flex-item editable'></div>
                </div>
            </div>
        )
    }
}
