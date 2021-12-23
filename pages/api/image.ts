import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import axios from 'axios'

//set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

const updateFeaturePhoto = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({
      error: { message: 'Method not allowed' }
    })
  }
  try {
    let imageBuffer: Buffer

    const parsedFormData = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({ keepExtensions: true })
      form.on('data', data => {
        imageBuffer = Buffer.from(data.buffer)
      })
      form.parse(
        req,
        (
          err,
          { 'image-location': imageLocation, 'user-id': userId },
          { file }
        ) => {
          if (err || !file) {
            reject({ err })
          }

          resolve({ file, imageLocation, userId })
        }
      )
    })

    const { file, imageLocation, userId } = parsedFormData as {
      file: formidable.File
      imageLocation: string
      userId: string
    }

    // const response = await newApiClient.post(
    //   '/getSignedUrl',
    //   {
    //     file_name: file.originalFilename,
    //     content_type: file.mimetype
    //   },
    //   {
    //     headers: createAuthHeaderFromApiRequest(req)
    //   }
    // )

    // const { data: presignedUrl } = response.data as BackEndApiResponseData
    // const url = new URL(presignedUrl)

    // await Promise.all([
    //   axios.put(presignedUrl, imageBuffer!, {
    //     headers: {
    //       'Content-Type': file.mimetype!
    //     }
    //   }),

    //   newApiClient.post(
    //     '/saveProfileImage',
    //     {
    //       id: userId,
    //       image: url.origin + url.pathname,
    //       image_location: imageLocation
    //     },
    //     {
    //       headers: createAuthHeaderFromApiRequest(req)
    //     }
    //   )
    // ])

    const responseBody = {
      statusCode: 200,
      file,
      imageLocation,
      userId,
    }

    res.status(200).json(responseBody)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default updateFeaturePhoto
