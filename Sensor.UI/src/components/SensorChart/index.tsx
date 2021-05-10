import * as S from './styles'
import CardContent from '@material-ui/core/CardContent'
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts'

type ChartLine = {
  stroke: string
  dataKey: string
}

interface Props {
  data: any[]
  lines: ChartLine[]
}

const SensorChart = ({ data, lines }: Props) => {
  return (
    <S.Wrapper>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={300}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="total" />
            <Tooltip labelStyle={{ color: '#000' }} />
            <Legend />
            {lines.map((line, key) => (
              <Bar
                key={key.toString()}
                dataKey={line.dataKey}
                fill={line.stroke}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </S.Wrapper>
  )
}

export default SensorChart
