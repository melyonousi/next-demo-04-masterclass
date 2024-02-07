'use client'

import Image from "next/image"
import { useState } from "react"

const AWS = () => {
    const [file, setFile] = useState<File | null>()
    const [url, setUrl] = useState<string>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) {
            console.error('No file selected');
            return;
        }

        try {
            const formData = new FormData()
            formData.set('file', file)

            const res = await fetch('/api/aws', {
                method: 'PUT',
                body: formData
            })
            const data = await res.json()
            if (res.ok) {
                setUrl(data)
            } else {
                console.log(data)
            }
        } catch (error) {
            console.log("hado homa l'errors", error)
        }

    }

    return (
        <div>
            {
                url ? <Image src={url} alt="profile s3" width={150} height={50} quality={100} /> : ''
            }

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
                    type="file"
                    name="file"
                    id="file"
                    placeholder="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default AWS