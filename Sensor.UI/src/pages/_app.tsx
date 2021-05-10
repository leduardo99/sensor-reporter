import { AppProps } from 'next/app'

import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyles from 'styles/global'

import { ThemesProvider } from 'contexts/ThemeContext'
import { RegionsProvider } from 'contexts/RegionContext'

import AppBar from 'components/AppBar'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemesProvider>
      <CssBaseline />
      <GlobalStyles />
      <RegionsProvider>
        <AppBar />
        <Component {...pageProps} />
      </RegionsProvider>
    </ThemesProvider>
  )
}

export default App
