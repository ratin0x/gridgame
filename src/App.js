import React from 'react';
import styled from 'styled-components'
import { Board, Tile, Player, Vortex } from './components'
import { LevelOne } from  './data'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const UP = 'UP'
const DOWN = 'DOWN'

class AppBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props,
      map: {
        dimensions: {
          x: 5,
          y: 5
        },
        items: LevelOne
      },
      player: {
        position: {
          x: 3,
          y: 1
        }
      },
      vortex: {
        position: {
          x: 3,
          y: 5,
          icon: '*'
        }
      },
    }
  }

  keyEvents = {
    'ArrowDown': () => {
      let newPlayer = this.state.player
      newPlayer.position.y = newPlayer.position.y === this.state.map.dimensions.y ? newPlayer.position.y : newPlayer.position.y + 1
      this.setState({ player: newPlayer })
    },
    'ArrowUp': () => {
      let newPlayer = this.state.player
      newPlayer.position.y = newPlayer.position.y === 1 ? 1 : newPlayer.position.y - 1
      this.setState({ player: newPlayer })
    }    
  }

  moveToTile = (tileConfig) => {
    let newPlayer = this.state.player
    newPlayer.position.x = tileConfig.x
    newPlayer.position.y = tileConfig.y

    if (this.checkValidTarget(tileConfig)) {
      this.setState({player: newPlayer})
      if (this.checkCollision(tileConfig)) {
        console.log('Boom!')
      }
      this.moveVortex()
    } else {
      console.log(`Can't go there`)
    }
  }

  checkValidTarget = (tileConfig) => {
    console.log(`checkValidTarget ${JSON.stringify(tileConfig)}`)
    if (tileConfig.content === null || tileConfig.content === ' ') {
      return false
    } else {
      return true
    }
  }

  checkCollision = (tileConfig) => {
    console.log('checkCollision')
    const { playerX, playerY } = this.state.player.position
    const { vortexX, vortexY } = this.state.vortex.position
    const dX = vortexX - playerX
    const dY = vortexY - playerY
    
    if ( dX === 0 && dY === 0 ) return true

    return false
    
  }

  moveVortex = () => {
    const { playerX, playerY } = this.state.player.position
    const { vortexX, vortexY } = this.state.vortex.position
    const dX = vortexX - playerX
    const dY = vortexY - playerY
    console.log('moveVortex')
  }

  keyHandler = (event) => {
    console.log('Event')
    const keyAction = this.keyEvents[event.key];
    if (keyAction) keyAction(event);
  }

  clickHandler = (tileConfig, event) => {
    console.log(`Click : ${JSON.stringify(tileConfig)}, ${event}`)
    this.moveToTile(tileConfig)
  }

  componentDidMount() {
    if (document) {
      document.addEventListener('keydown', this.keyHandler)
    }
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener('keydown', this.keyHandler)
    }
  }

  render() {
    const {
      keyHandler,
      clickHandler,
      props: { className },
      state: { dimensions, map, player, vortex }
    } = this

    return (
      <div className={className}>
        <Board dimensions={dimensions} onKeyPress={keyHandler} tabIndex="0">
          {
            map.items.map((item, index) => {
              // return <span key={`testitem-${index}`}>{item}</span>
              return <Tile className={className} config={item} onClick={(e) => clickHandler(item, e)} />
            })
          }
          <Player position={player.position} />
          <Vortex position={vortex.position} />
        </Board>
      </div>
    )
  }
}

export const App = styled(AppBase)`
  padding: 0.5rem 0.5rem;
  // margin: 0.5rem 0.5rem;

  background-color: lightgrey;
  height: 100%;
`
