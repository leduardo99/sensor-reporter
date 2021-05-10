import styled from 'styled-components'
import { up } from 'styled-breakpoints'

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 15px;

  &.fluid {
    width: 100%;
    margin: 0;
  }

  &:not(.fluid) {
    ${up('sm')} {
      max-width: 540px;
    }

    ${up('md')} {
      max-width: 720px;
    }

    ${up('lg')} {
      max-width: 960px;
    }

    ${up('xl')} {
      max-width: 1140px;
    }
  }
`
