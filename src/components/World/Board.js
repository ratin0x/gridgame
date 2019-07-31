import * as React from 'react'
import styled from 'styled-components'

const BoardBase = ({ className, children, dimensions, onKeyPress }) => (
  <div className={className} onKeyPress={onKeyPress}>
    {children}
  </div>
)

const makeGrid = (dimensions) => {
  if (!dimensions) {
    return 'grid: auto auto / auto auto;'
  } else {
    return ` grid: repeat(${dimensions.x}, minmax(0.5fr, 1fr) ) / repeat(${dimensions.y}, minmax(0.5fr, 1fr));`
  }
}

export const Board = styled(BoardBase)`
  display: grid;
  ${props => makeGrid(props.dimensions)}
  // grid-auto-rows: 1fr;
  // grid-auto-columns: 1fr;
  background-color: white;
  height: 100%;
`
