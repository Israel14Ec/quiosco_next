"use client"

import { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget} from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import { getImagePath } from '@/src/utils'

export default function ImageUpload({image}: {image: string|undefined}) {

    const [imageUrl, setImageUrl] = useState('')

    const uploadPreset = "p2gisfpc"
  return (
    <CldUploadWidget
        onSuccess={(result,{widget}) => {
            if(result.event === 'success') {
                widget.close() //Cierra cloudinary

                // @ts-expect-error: Cloudinary no provee tipeo adecuado para result.info.secure_url
                setImageUrl(result.info.secure_url)
                
            }      
        }}
        uploadPreset={uploadPreset}
        options={{
            maxFiles: 1, //Maximo un archivo

        }}
    >

        {({open}) =>  (
            <>
                <div className=' space-y-1'>
                    <label className=' text-gray-900'>Imagen producto</label>
                    <div className=' relative cursor-pointer hover:opacity-70 transition p-5
                         border-neutral-600 flex flex-col justify-center items-center gap-4 text-gray-700 bg-slate-100'
                        onClick={() => open()}     
                    >
                        <TbPhotoPlus
                            size={50}
                        />
                        <p className=' text-lg font-semibold text-gray-800'>Agregar imagen</p>
                        {imageUrl && (
                            <div className=' absolute inset-0 w-full h-full'>
                                <Image
                                    fill
                                    style={{objectFit: 'contain'}}
                                    src={imageUrl}
                                    alt='Imagen de producto'
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                { image && !imageUrl && (
                    <div className=' space-y-2'>
                        <label className=' text-sm font-semibold text-gray-800'>Imagen actual:</label>
                        <div className=' relative w-64 h-64'>
                            <Image 
                                fill
                                src={getImagePath(image)}
                                alt='Imagen producto'
                            />
                        </div>
                    </div>
                )}
                <input 
                    type='hidden'
                    name='image'
                    defaultValue={imageUrl ? imageUrl : image}
                />
            </>
        )}
    </CldUploadWidget>
  )
}
