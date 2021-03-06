import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="container h-full mx-aut0">
      <Head>
        <title>Home Page</title>
      </Head>
      <main>Home page</main>
      <footer>Footer</footer>
    </div>
  )
}

export default Home
