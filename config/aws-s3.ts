import { S3Client } from '@aws-sdk/client-s3';

export function awsS3() {
    const s3 = new S3Client({
        region: process.env.AWS_BUCKET_REGION ?? '',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY ?? ''
        }
    })

    return s3;
}