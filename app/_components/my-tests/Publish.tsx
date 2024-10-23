import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePublishTestMutation } from '@/app/_dataOperations/mutations/mutations';
import { usePathname, useRouter } from "next/navigation";

const Publish = () => {
    const router = useRouter()
    const pathnameList = usePathname().split("/")
    const slug = pathnameList[2];
    const { mutate, isPending } = usePublishTestMutation()

    const publishTest = () =>{
        mutate(slug, {
            onSuccess: (data) => {
                router.push(`/my-tests?filter=${data.public ? "public" : "private"}`)
            }
        })
    }
    return (
        <div className="flex gap-8 items-center justify-center">
            <div className='sm:w-[500px] w-full flex flex-col items-center'>
                <Image src="/publishTestImage.png" width={600} height={600} className='w-full' alt='Publish Test Image' />
                <h1 className='-mt-5 text-lg font-semibold text-center'>Your test is ready to be published</h1>
                <Button onClick={publishTest} className='w-full mt-8 bg-zinc-700 hover:bg-zinc-700/90'>
                    {isPending ? <span>Publishing...</span> : <span>Publish</span>}
                </Button>
            </div>
        </div>
    )
}

export default Publish
