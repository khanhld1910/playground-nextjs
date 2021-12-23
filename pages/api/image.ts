import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import axios from 'axios'
import fs from 'fs'
import tmp from 'tmp'


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
  // create the tmp dir
  const tmpObj = tmp.dirSync({unsafeCleanup: true})
  try {
    const parsedFormData = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({ keepExtensions: true, uploadDir: tmpObj.name })
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

    const [
      response,
      imageBuffer,
    ] = await Promise.all([
      await axios.post(
        'https://j7pzco1sdk.execute-api.us-east-1.amazonaws.com/staging/v1/getSignedUrl',
        {
          file_name: file.newFilename,
          content_type: file.mimetype
        },
        {
          headers: {
            'Authorization' : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImUxYTFmMWM5MmQ0NzQ5MjRhNjQ5MzQ3MmJlYjZhODQyIiwiYXVkIjoiaHR0cHM6Ly9qN3B6Y28xc2RrLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YWdpbmcvIiwiaWF0IjoxNjQwMDQ3MTA3LCJleHAiOjE2NDc4MjMxMDd9.2EDXwmszqU3e8qNMF2G9KnixiGJvv8A0sstFyVUduHQ"
          }
        }
      ),
      new Promise((resolve, reject) =>
        fs.readFile(file.filepath, (err, data) => {
          if (err) {
            return reject(err)
          }
          resolve(data)
        })
      ),
    ])

    const { data: presignedUrl } = response.data as { data: string }
    const url = new URL(presignedUrl)

    const [
      { data: uploadData, status: uploadStatus }
    ] = await Promise.all([
      axios.put(presignedUrl, imageBuffer!, {
        headers: {
          'Content-Type': file.mimetype!
        }
      }),

      // newApiClient.post(
      //   '/saveProfileImage',
      //   {
      //     id: userId,
      //     image: url.origin + url.pathname,
      //     image_location: imageLocation
      //   },
      //   {
      //     headers: createAuthHeaderFromApiRequest(req)
      //   }
      // )
    ])

    const responseBody = {
      statusCode: 200,
      image: url.origin + url.pathname,
      dir: file.filepath,
      uploadData,
      uploadStatus,
    }

    res.status(200).json(responseBody)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  } finally {
    // clear the tmp dir
    tmpObj.removeCallback()
  }
}

export default updateFeaturePhoto
