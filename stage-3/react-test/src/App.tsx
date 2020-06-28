import React from 'react';
import Test001 from './001/index-solve'
import BlackWhiteTurn from './黑白迭代';
import BlackWhiteBoth from './黑白无双';
import ForwardRef from './ref-forwardRef'
import Children from './children'
import Game2 from './game02'
import Animate from './animate'
import RotateJigsaw from './旋转拼图'
import CustomHooks from './自定义Hooks'

function App() {
    return (
        <div className="App">
          {/* <CustomHooks /> */}
          {/* <Test001 /> */}
          <BlackWhiteTurn />
          {/* <RotateJigsaw /> */}
          {/* <ForwardRef /> */}
          {/* <Children /> */}
          {/* <Game2 /> */}
          {/* <Animate /> */}
          {/* <BlackWhiteBoth /> */}
        </div>
    );
}

export default App;
