import HomeTemplate from 'templates/Home'

import { Event } from 'shared/Event'
import { InferGetServerSidePropsType } from 'next'

export default function Home({
  events
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeTemplate events={events} />
}

export const getServerSideProps = async () => {
  const events: Event[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events`
  )
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch((error) => console.log(error))

  return {
    props: {
      events: events ?? []
    }
  }
}
