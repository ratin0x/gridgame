import React from 'react';
import styled from 'styled-components'
import { Board, Tile, Player } from './components'

const testData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

class AppBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props,
      player: {
        position: {
          x: 2,
          y: 1
        }
      },
      map: {
        dimensions: {
          x: 5,
          y: 5
        },
        items: [
          { x: 1, y: 1, content: ' ' },
          { x: 2, y: 1, content: ' ' },
          { x: 3, y: 1, content: 'o' },
          { x: 4, y: 1, content: ' ' },
          { x: 5, y: 1, content: ' ' },
          { x: 1, y: 2, content: ' ' },
          { x: 2, y: 2, content: 'o' },
          { x: 3, y: 2, content: ' ' },
          { x: 4, y: 2, content: 'o' },
          { x: 5, y: 2, content: ' ' },
        ]
      }
    }
  }

  keyEvents = {
    'ArrowLeft': () => {
      let newPlayer = this.state.player
      newPlayer.position.x = newPlayer.position.x === 1 ? 1 : newPlayer.position.x - 1
      this.setState({ player: newPlayer })
    },
    'ArrowRight': () => {
      let newPlayer = this.state.player
      newPlayer.position.x = newPlayer.position.x === this.state.map.dimensions.x ? newPlayer.position.x : newPlayer.position.x + 1
      this.setState({ player: newPlayer })
    }
  }

  keyHandler = (event) => {
    console.log('Event')
    const keyAction = this.keyEvents[event.key];
    if (keyAction) keyAction(event);
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
      props: { className },
      state: { dimensions, map, player }
    } = this

    return (
      <div className={className}>
        <Board dimensions={dimensions} onKeyPress={keyHandler} tabIndex="0">
          {
            map.items.map((item, index) => {
              // return <span key={`testitem-${index}`}>{item}</span>
              return <Tile className={className} config={item} />
            })
          }
          <Player position={player.position} />
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
