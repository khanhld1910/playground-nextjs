import { withSessionSsr } from 'lib/session'
import type { NextPage } from 'next'
import Head from 'next/head'


export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const {auth} = req.session
  return {
    notFound: !auth, // unauthentication or unauthorization
    props: { auth },
  }
})

const Protected: NextPage = (props) => {
  return (
    <div className="container h-full mx-aut0">
      <Head>
        <title>Protected Page</title>
      </Head>
      <main>Protected page</main>
      <div>{JSON.stringify(props.auth, null, 2)}</div>
      <footer>Footer</footer>
    </div>
  )
}

export default Protected
