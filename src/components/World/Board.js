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
    return ` grid: repeat(${dimensions.x}, minmax(150px, 1fr) ) / repeat(${dimensions.y}, minmax(150px, 1fr));`
  }
}

export const Board = styled(BoardBase)`
  display: grid;
  ${props => makeGrid(props.dimensions)}
  background-color: white;
  height: 100%;
`
