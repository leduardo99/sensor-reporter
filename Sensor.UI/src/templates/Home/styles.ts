import styled from 'styled-components'
import { down } from 'styled-breakpoints'

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 20px 20px;
  grid-template-areas: '. . .';

  ${down('lg')} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      '.'
      '.'
      '.';
  }
`
