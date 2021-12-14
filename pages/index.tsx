import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="container h-full mx-auto bg-green-400">
        <Head>
          <meta name="description" content="Generated by create next app" />
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>Header</header>
        <main>Hello World</main>
        <footer>Footer</footer>
      </div>
    </div>
  )
}

export default Home
