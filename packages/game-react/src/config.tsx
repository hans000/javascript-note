import Game01 from './views/峰回路转'
import Game02 from './views/黑白迭代'
import Game03 from './views/黑白无双'
import Game04 from './views/六边形2028'
import Game05 from './views/数字华容道'
import Game06 from './views/旋转拼图'
import Game07 from './views/血战到底'
import Game09 from './views/战旗阵地'
import Game10 from './views/Game2048'
const numberRing = './assets/number-ring.png'
const numberPuzzle = './assets/number-puzzle.png'
const flagBattle = './assets/flag-battle.png'
const blackWhiteTurn = './assets/black-white-turn.png'
const blackWhiteTurnPro = './assets/black-white-turn-pro.png'
const rotatePuzzle = './assets/rotate-puzzle.png'
const number2048 = './assets/number-2048.png'

export default [
    {
      path: '/number-ring',
      title: '峰回路转',
      element: <Game01 />,
      description: '峰回路转',
      url: numberRing,
    },
    {
      path: '/black-white-turn',
      title: '黑白迭代',
      element: <Game02 />,
      description: '黑白迭代',
      url: blackWhiteTurn,
    },
    {
      path: '/black-white-turn-pro',
      title: '黑白无双',
      element: <Game03 />,
      description: '黑白无双',
      url: blackWhiteTurnPro,
    },
    // {
    //   path: '/game04',
    //   title: '六边形2028',
    //   element: <Game04 />,
    //   description: '六边形2028',
    //   url: flagBattle,
    // },
    {
      path: '/number-puzzle',
      title: '数字华容道',
      element: <Game05 />,
      description: '数字华容道',
      url: numberPuzzle,
    },
    {
      path: '/rotate-puzzle',
      title: '旋转拼图',
      element: <Game06 />,
      description: '旋转拼图',
      url: rotatePuzzle,
    },
    // {
    //   path: '/game07',
    //   title: '血战到底',
    //   element: <Game07 />,
    //   description: '血战到底',
    //   url: flagBattle,
    // },
    {
      path: '/game09',
      title: '战旗阵地',
      element: <Game09 />,
      description: '战旗阵地',
      url: flagBattle,
    },
    {
      path: '/number-2048',
      title: '2048',
      element: <Game10 />,
      description: '2048',
      url: number2048,
    },
  ]