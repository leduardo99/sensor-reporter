import React, { useEffect, useState } from 'react'
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel
} from '@microsoft/signalr'

import Container from 'components/Container'
import SensorChart from 'components/SensorChart'

import { useRegion } from 'contexts/RegionContext'

import { Event } from 'shared/Event'

import SensorTable from './SensorTable'

import * as S from './styles'

interface Props {
  events: Event[]
}

export default function Home({ events }: Props) {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  const [sensor01, setSensor01] = useState<number>(0)
  const [sensor02, setSensor02] = useState<number>(0)

  const { region } = useRegion()

  const [
    hubConnectionBuilder,
    setHubConnectionBuilder
  ] = useState<null | HubConnection>(null)

  useEffect(() => {
    const builder = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .withUrl(String(process.env.NEXT_PUBLIC_EVENT_HUB))
      .build()

    setHubConnectionBuilder(builder)
  }, [])

  useEffect(() => setAllEvents(events), [events])

  useEffect(() => {
    setFilteredEvents(
      allEvents.filter((f) => f.tag.split('.')[1] === region && f.value)
    )
  }, [allEvents])

  useEffect(() => {
    setSensor01(filteredEvents.filter((f) => f.tag.includes('sensor01')).length)
    setSensor02(filteredEvents.filter((f) => f.tag.includes('sensor02')).length)
  }, [filteredEvents])

  useEffect(() => {
    async function startConnection() {
      try {
        await hubConnectionBuilder?.start()

        hubConnectionBuilder?.on('EventCreated', (event: Event) =>
          setAllEvents((prevEvents) => [...prevEvents, event])
        )
      } catch (error) {
        console.log(error)
      }
    }

    if (hubConnectionBuilder) {
      startConnection()
    }

    return () => {
      hubConnectionBuilder?.stop()
    }
  }, [hubConnectionBuilder])

  return (
    <>
      <Container className="fluid">
        <S.ChartGrid>
          <SensorChart
            data={[
              {
                name: `Total events - ${region}`,
                total: sensor01 + sensor02
              }
            ]}
            lines={[
              {
                dataKey: 'total',
                stroke: '#BBC324'
              }
            ]}
          />
          <SensorChart
            data={[
              {
                name: 'Total events: Sensor 01',
                sensor01,
                total: sensor01
              }
            ]}
            lines={[
              {
                dataKey: 'sensor01',
                stroke: '#9C8CA4'
              }
            ]}
          />
          <SensorChart
            data={[
              {
                name: 'Total events: Sensor 02',
                sensor02,
                total: sensor02
              }
            ]}
            lines={[
              {
                dataKey: 'sensor02',
                stroke: '#bcb1be'
              }
            ]}
          />
        </S.ChartGrid>
      </Container>

      <Container className="fluid">
        <SensorTable rows={allEvents} />
      </Container>
    </>
  )
}
