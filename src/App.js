import React from 'react';
import styled from 'styled-components'
import { Board, Tile, Player, Vortex } from './components'
import { LevelOne } from './data'

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
      this.setState({ player: newPlayer })
      this.moveVortex()
      if (this.checkCollision(tileConfig)) {
        console.log('Boom!')
      }
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
    const playerX = this.state.player.position.x
    const playerY = this.state.player.position.y
    const vortexX = this.state.vortex.position.x
    const vortexY = this.state.vortex.position.y

    const dX = vortexX - playerX
    const dY = vortexY - playerY

    if (dX === 0 && dY === 0) return true

    return false

  }

  moveVortex = () => {
    const playerX = this.state.player.position.x
    const playerY = this.state.player.position.y
    const vortexX = this.state.vortex.position.x
    const vortexY = this.state.vortex.position.y

    const dX = vortexX - playerX
    const dY = vortexY - playerY
    const validTargets = this.getValidTiles(this.state.vortex.position)
    let bestTarget
    // Try and figure out which is the closest square to the player
    for (const target of validTargets) {
      if (!bestTarget) {
        bestTarget = target
      } else {
        const pdX = Math.abs(playerX - target.x)
        const pdY = Math.abs(playerY - target.y)

        const tdX = Math.abs(playerX - bestTarget.x)
        const tdY = Math.abs(playerY - bestTarget.y)

        if (pdX < tdX || pdY < tdY) {
          bestTarget = target
        }

        console.log(`${pdX}, ${pdY}`)

      }
      let newVortexPosition = this.state.vortex.position
      newVortexPosition.x = bestTarget.x
      newVortexPosition.y = bestTarget.y
      this.setState({
        vortex: {
          position: newVortexPosition
        }
      })

      console.log(`moveVortex ${JSON.stringify(target)}`)
    }
  }

  getValidTiles = (origin) => {
    return this.state.map.items.reduce((acc, item) => {
      // Fast fail for empty squares
      if (item.content === null || item.content === ' ') return acc

      const oX = origin.x
      const oY = origin.y

      const validX = { min: Math.max(0, oX - 1), max: Math.min(oX + 1, this.state.map.dimensions.x) }
      const validY = { min: Math.max(0, oY - 1), max: Math.min(oY + 1, this.state.map.dimensions.y) }

      if (item.x === validX.min || item.x === validX.max) {
        if (item.y === validY.min || item.y === validY.max) {
          acc.push(item)
        }
      }

      return acc
    }, [])
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
