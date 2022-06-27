import { withSessionRoute } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { Auth, AuthWithToken } from './info'



async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  req.session.auth = {
    isLoggedIn: true,
    userId: 'test_user_id',
    token: 'sample_token'
  } as AuthWithToken

  await req.session.save()
  res.json({
    isLoggedIn: true,
    userId: 'test_user_id',
  } as Auth)
}

export default withSessionRoute(loginRoute)
