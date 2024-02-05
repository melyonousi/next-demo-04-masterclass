import { awsS3 } from "@/config/aws-s3"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { path: string } }, res: NextResponse) {

    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: params.path
    })

    const signedURL = await getSignedUrl(awsS3(), getObjectCommand)

    try {
        return NextResponse.json(signedURL)
    } catch (error) {
        return NextResponse.json(error)
    }
}