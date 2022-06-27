import { withSessionRoute } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  req.session.auth = {
    userId: 'test_user_id',
    token: 'sample_token'
  }
  await req.session.save()
  res.json({})
}

export default withSessionRoute(loginRoute)
