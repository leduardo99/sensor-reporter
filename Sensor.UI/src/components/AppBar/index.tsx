import {
  AppBar as MaterialBar,
  Toolbar,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { GitHub, LinkedIn, BrightnessMedium } from '@material-ui/icons'
import Image from 'next/image'

import RegionSelect from 'components/RegionSelect'

import { useTheme } from 'contexts/ThemeContext'

import * as S from './styles'

const AppBar: React.FC = () => {
  const { toggleTheme } = useTheme()

  return (
    <MaterialBar position="static" color="secondary">
      <Toolbar>
        <S.Container>
          <S.LeftContent>
            <Image src="/img/logo.png" width={100} height={40} />
          </S.LeftContent>

          <S.RightContent>
            <RegionSelect />

            <Tooltip title="My Github" aria-label="My Github">
              <IconButton
                aria-label="GitHub"
                color="inherit"
                href="https://github.com/leduardo99"
              >
                <GitHub />
              </IconButton>
            </Tooltip>

            <Tooltip title="My LinkedIn" aria-label="My LinkedIn">
              <IconButton
                aria-label="LinkedIn"
                color="inherit"
                href="https://linkedin.com/in/leduardo99"
              >
                <LinkedIn />
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Toggle light/dark theme"
              aria-label="Toggle light/dark theme"
            >
              <IconButton
                aria-label="Toggle light/dark theme"
                color="inherit"
                onClick={() => toggleTheme()}
              >
                <BrightnessMedium />
              </IconButton>
            </Tooltip>
          </S.RightContent>
        </S.Container>
      </Toolbar>
    </MaterialBar>
  )
}

export default AppBar
