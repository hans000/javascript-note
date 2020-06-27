import React, { Component } from 'react'
import Tile from './Tile'
import Dot from './Dot'
import { initDotList } from './logic';

interface IProps {
    data: number[];
    onClick: (index: number) => void;
}
interface IState { }

export default class Pane extends Component<IProps, IState> {
    public static dotList: number[] = initDotList();

    render() {
        return (
            <div className='pane'>
                <div className="tile-cont">
                    {
                        this.props.data.map((v, i) => <Tile key={i} value={v}/>)
                    }
                </div>
                <div className="dot-cont">
                    {
                        Pane.dotList.map((v, i) => {
                            return (
                                <Dot onClick={this.props.onClick} key={i} index={i} value={v}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
