"use client"

import React, { useState } from "react"
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useUploadBannerMutation } from "@/app/_dataOperations/mutations/mutations"
import { Span } from "next/dist/trace";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BannerUploadData } from "@/app/_types";


const Gallery = () => {
    const router = useRouter()
    const pathnameList = usePathname().split("/")
    const slug = pathnameList[2];
    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>("")

    const { mutate, isPending } = useUploadBannerMutation()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setImage(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = () => {
        if (!image) {
            alert("Please select an image")
            return
        }

        const formData = new FormData();
        formData.append("banner", image);
        formData.append("slug", slug);
        mutate(formData as unknown as BannerUploadData, {
            onSuccess: (data) => {
                router.push(`/my-tests/${slug}/edit?tab=publish`)
            },
        })
    }
    return (
        <div className="flex flex-col gap-8 items-center">
            <div className="sm:w-[500px] w-full flex flex-col">
                <input id="banner" type="file" onChange={handleFileChange} className="hidden" />
                <div className="border border-zinc-300 w-full rounded-md h-[250px] sm:h-[300px] flex items-center justify-center flex-col gap-2 bg-zinc-50 relative">
                    <label htmlFor="banner" id="upload-widget" className="bg-primary text-white px-6 py-2 rounded-full flex gap-2 items-center cursor-pointer relative z-10 shadow-lg hover:shadow-md hover:-translate-y-1 transition duration-700">
                        <Upload className=" w-5 h-5" />

                        <p className=" text-lg">
                            {imageUrl === "" ? <span>Upload Banner</span> : <span>Change Banner</span>}
                        </p>
                    </label>
                    {imageUrl != "" && <img src={imageUrl} className="object-cover absolute top-0 right-0 w-full h-full rounded-md" />}
                </div>
                <Button onClick={handleSubmit} className="w-full mt-8 bg-zinc-700 hover:bg-zinc-700/90" disabled={isPending}>
                    {isPending ? <span>Saving...</span> : <span>Save</span>}
                </Button>
            </div>

        </div>
    )
}

export default Gallery