import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@blkbirds/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Opensans', sans-serif;
    font-style: italic;
  }
  body {

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
