import { useState } from 'react'
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import RoomIcon from '@material-ui/icons/Room'

import { useRegion } from 'contexts/RegionContext'

const RegionSelect: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { region, changeRegion } = useRegion()

  function onChangeRegion(region: string) {
    changeRegion(region)

    handleClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title="Change region" aria-label="Change region">
        <Button
          aria-controls="region-filter"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<RoomIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          color="inherit"
        >
          {region.toLocaleUpperCase()}
        </Button>
      </Tooltip>
      <Menu
        id="region-filter"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => onChangeRegion('north')}>North</MenuItem>
        <MenuItem onClick={() => onChangeRegion('south')}>South</MenuItem>
        <MenuItem onClick={() => onChangeRegion('southeast')}>
          Southeast
        </MenuItem>
        <MenuItem onClick={() => onChangeRegion('west')}>West</MenuItem>
        <MenuItem onClick={() => onChangeRegion('east')}>East</MenuItem>
      </Menu>
    </>
  )
}

export default RegionSelect
