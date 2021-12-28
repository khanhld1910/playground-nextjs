import axios, { AxiosRequestConfig } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'


const ImageUploadPage: NextPage = () => {
  const [imageSrc, setImageSrc] = useState<string>()
  const [data, setData] = useState<string>()
  const [uploadFile, setUploadFile] = useState<File>()
  const [imageName, setImageName] = useState<string>()
  const [contentType, setContentType] = useState<string>()
  const [uploading, setUploading] = useState<boolean>()
  
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.stopPropagation()
      event.preventDefault()
      var file = event?.target?.files?.[0]
      if (!file) {
        return
      }
      setUploadFile(file)
      setImageSrc(URL.createObjectURL(file!))
      setData(
        JSON.stringify(
          {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          },
          null,
          2
        )
      )
      setContentType(file.type)
      setImageName(uuidv4() + file.type.replace('image/', '.'))
    } catch (e: any) {
      console.log(e?.stack)
    }
  }

  const handleUpload = async () => {
    try {
      setUploading(true)

    const getPresignedUrlConfig = {
      method: 'post',
      url: '---',
      headers: {
        Authorization:
          '---',
      },
      data: {
        file_name: imageName,
        content_type: contentType
      },
    } as AxiosRequestConfig

    // const getPresignedUrlResponse = await axios(getPresignedUrlConfig)
    // const { statusCode, data: presignedUrl } = getPresignedUrlResponse.data as {
    //   data: string
    //   statusCode: number
    // }
    // if (statusCode !== 200) throw 'Cannot get presigned URL'
    
    const presignedUrl = "https://test-upload-photo-khanhld.s3.us-east-2.amazonaws.com/sunny-stag.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARNANCREA2JG3C7HN%2F20211228%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20211228T071259Z&X-Amz-Expires=900&X-Amz-Signature=ffa486f3628a44276fc95dc09efade2e50d24497b492bf82ce0d4d20618d39db&X-Amz-SignedHeaders=host"
    // const presignedUrl = "https://test-upload-photo-khanhld.s3.amazonaws.com/sunny-stag.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARNANCREA2JG3C7HN%2F20211228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211228T071808Z&X-Amz-Expires=900&X-Amz-Signature=e93b6f736d42585e224774936ac8f31f09430d373755c7f49663bdb2b7f18fde&X-Amz-SignedHeaders=host"
    
    console.log({contentType})
    // const uploadToS3Response = await axios.put(presignedUrl, uploadFile, {
    //   headers: {
    //     'Content-Type': contentType!,
    //   }
    // })
    const uploadToS3Response = await axios.put(presignedUrl, uploadFile)
    
    // const formData = new FormData
    // formData.append('file', uploadFile!)
    // const uploadToS3Response = await axios.post(presignedUrl, formData)
    
    console.log({ data: uploadToS3Response.data })
    
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container h-full mx-aut0">
      <Head>
        <title>ImageUploadPage</title>
      </Head>
      <main className="flex flex-col items-center w-full h-full p-20 space-y-8">
        <div className="grid items-start justify-around grid-cols-2 gap-8">
          <div className="w-full h-[300px] relative border-b">
            {imageSrc && (
              <Image
                alt="test-image"
                src={imageSrc}
                layout="fill"
                objectFit="scale-down"
              />
            )}
          </div>
          <p className="whitespace-pre-line">{data}</p>
        </div>

        <input
          type="file"
          name="image-input"
          accept="image/png, image/gif, image/jpeg"
          onChange={onChangeFile}
        />

        <div className="flex items-center justify-center w-full space-x-2">
          {imageSrc && (
            <>
              <button
                onClick={handleUpload}
                disabled={!imageSrc}
                className="p-2 bg-blue-400 border rounded-md shadow-md cursor-pointer"
              >
                Upload to S3
              </button>
              <pre>uploading {uploading ? 'true' : 'false'}</pre>
            </>
          )}
        </div>
      </main>
      <footer>Footer</footer>
    </div>
  )
}

export default ImageUploadPage
