import axios from 'axios'
import useAuth from 'hooks/useAuth'
import type { NextPage } from 'next'
import Head from 'next/head'

const Login: NextPage = () => {

  const { auth, mutateAuth } = useAuth({
    redirectTo: '/protected',
    redirectIfFound: true
  })

  console.log({auth})

  const login = async () => {
    mutateAuth(
      await axios.post('/api/login', {})
    )
  }
  return (
    <div className="container h-full mx-aut0">
      <Head>
        <title>Login Page</title>
      </Head>
      <main>
        <h1>Login page</h1>
        <div className="p-4 my-20">
          <button onClick={login}>Login</button>
        </div>
      </main>
    </div>
  )
}

export default Login
