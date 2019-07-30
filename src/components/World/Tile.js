import * as React from 'react'
import styled from 'styled-components'

const TileBase = ({ className, config }) => (
  <span className={className}>{config.content}</span>
)

export const Tile = styled(TileBase)`
  ${props => props.config.x ? `grid-column-start: ${props.config.x}; grid-column-end: ${props.config.x + 1};` : ''}
  ${props => props.config.y ? `grid-row-start: ${props.config.y}; grid-row-end: ${props.config.y + 1};` : ''}
  border: 1px solid black;
`

