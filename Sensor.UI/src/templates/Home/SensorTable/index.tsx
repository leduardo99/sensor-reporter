import React from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid'

import * as S from './styles'
import { Event } from 'shared/Event'

interface Props {
  rows: Event[]
}

const SensorTable: React.FC<Props> = ({ rows }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'tag', headerName: 'Tag', flex: 1 },
    { field: 'value', headerName: 'Value', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'timestamp', headerName: 'Timestamp', flex: 1 }
  ]

  return (
    <S.Container>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: GridToolbar
        }}
      />
    </S.Container>
  )
}

export default SensorTable
