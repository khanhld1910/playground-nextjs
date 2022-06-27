import { useEffect } from 'react'
import Router from 'next/router'

import useSWR from 'swr'

import { Auth } from 'pages/api/info'

export default function useAuth({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: auth, mutate: mutateAuth } = useSWR<Auth>('/api/info')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !auth) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !auth?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && auth?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [auth, redirectIfFound, redirectTo])

  return { auth, mutateAuth }
}
