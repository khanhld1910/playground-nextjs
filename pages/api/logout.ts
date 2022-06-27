import { withSessionRoute } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  await req.session.destroy()

  res.json({})
}

export default withSessionRoute(logoutRoute)
