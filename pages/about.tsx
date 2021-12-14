import type { NextPage } from 'next'
import Head from 'next/head'

declare global {
  interface Window {
    gtag: (eventName: string, action: string, params: any) => unknown
  }
}

const About: NextPage = () => {
  const logToAnalytics = () => {
    window.gtag('event', 'dolphin-dreams', { something: 2222 })
  }
  return (
    <div className="container h-full mx-aut0">
      <Head>
        <title>About Page</title>
      </Head>
      <main>
        <h1>About page</h1>
        <div className="my-20 p-4">
          <button onClick={logToAnalytics}>Sample event</button>
        </div>
      </main>
    </div>
  )
}

export default About
