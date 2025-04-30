import React, { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "../ui/button"

type FileUploaderProps = {
  fieldChange: (files: File[]) => void
  mediaUrl: string
}

const FileUploader = ({fieldChange, mediaUrl } : FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState("")

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {
      "image/*" : [".png", ".jpeg", ".jpg"],
    }, })

  return (
    <div {...getRootProps()} className="flex justify-center items-center flex-col rounded-xl cursor-pointer">
        <input {...getInputProps()} className="cursor-pointer"/>

        {fileUrl ? (<>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image"
            className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top" />
          </div>
        </>) : (
          <div className="flex justify-center items-center flex-col w-full
          border border-slate-400 rounded-xl p-7 h-80 lg:h-[612px]">
            <img src="https://cdn-icons-png.flaticon.com/128/3713/3713687.png" alt=""
            width={96} height={77} />

          <h3 className="text-[16px] font-medium leading-[140%] text-slate-700
          mb-2 mt-6">Drag photo here</h3>

          <p className="text-slate-500 text-[14px] font-normal leading-[140%] mb-6">
            SVG, PNG, JPG
          </p>

          <Button type="button" className="h-12 bg-blue-300 px-5 text-slate-800
          flex gap-2 hover:text-white">
            Select from your device
          </Button>
          </div>
        )}
    </div>
  )
}

export default FileUploader