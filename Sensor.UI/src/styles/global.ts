import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${() => css`
    @media (max-width: 1080px) {
      html {
        font-size: 93.75%;
      }
    }

    @media (max-width: 768px) {
      html {
        font-size: 87.5%;
      }
    }

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  `}
`
export default GlobalStyles
