import * as React from 'react'
import styled from 'styled-components'

const VortexBase = ({ className, icon, position }) => (
  <span className={className}>{icon ? icon : '*'}</span>
)

export const Vortex = styled(VortexBase)`
  background-color: transparent;
  z-index: 10;
  ${props => props.position ? `grid-column-start: ${props.position.x}; grid-column-end: ${props.position.x + 1};` : `grid-column-start: 0; grid-column-end: 1;`}
  ${props => props.position ? `grid-row-start: ${props.position.y}; grid-row-end: ${props.position.y + 1};` : `grid-row-start: 0; grid-row-end: 1;`}
  justify-self: center;
  align-self: center;
`
