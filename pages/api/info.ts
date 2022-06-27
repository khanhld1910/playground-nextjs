import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from 'lib/session'

export type Auth = {
  isLoggedIn: boolean
  userId: string
}

export type AuthWithToken = Auth & {
  token: string
}

async function authRoute(req: NextApiRequest, res: NextApiResponse<Auth>) {
  if (req.session.auth) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.auth,
      isLoggedIn: true
    })
  } else {
    res.json({
      isLoggedIn: false,
      userId: ''
    })
  }
}

export default withSessionRoute(authRoute)
