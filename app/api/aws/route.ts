// 'use server'

import { awsS3 } from '@/config/aws-s3'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const getUrl = async (path: string) => {
    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path
    })
    return await getSignedUrl(awsS3(), getObjectCommand)
}



export async function PUT(req: NextRequest) {

    try {
        const data = await req.formData()
        const file: File | null = data.get('file') as unknown as File
        const fileName = file.name.replaceAll(' ', '-').toLowerCase()
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName
        })

        const signedURL = await getSignedUrl(awsS3(), putObjectCommand)


        await fetch(signedURL, {
            method: 'PUT',
            headers: {
                'Content-Type': file?.type
            },
            body: file,
        })

        const url = await getUrl(fileName)

        return NextResponse.json(url)

    } catch (error: any) {
        return NextResponse.json(error)
    }
}
