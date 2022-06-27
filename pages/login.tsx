import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'

const Login: NextPage = () => {
  const login = async () => {
    await axios.post('/api/login', {})
  }
  return (
    <div className="container h-full mx-aut0">
      <Head>
        <title>About Page</title>
      </Head>
      <main>
        <h1>About page</h1>
        <div className="p-4 my-20">
          <button onClick={login}>Login</button>
        </div>
      </main>
    </div>
  )
}

export default Login
