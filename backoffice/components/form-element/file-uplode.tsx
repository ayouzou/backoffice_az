import React, { useEffect, useRef, useState } from "react";
import { FieldErrors, RegisterOptions } from 'react-hook-form';
import { twMerge } from "tailwind-merge";
import { UploadCloudIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
interface Props {
    name: string
    id?: string
    label?: string
    placeholder?: string
    validation?: RegisterOptions<any, any> | undefined
    defaultValue?: string
    errors?: FieldErrors<Record<string, any>>;
    type?: string
    setUploadedAssets?: React.Dispatch<React.SetStateAction<string[]>>,
    multiple?: boolean
}

const FileUpload = ({ id, name, label, placeholder, setUploadedAssets, multiple = true }: Props) => {
    const ref = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [blobs, setBlobs] = useState<string[]>();
    const handleClick = () => {
        ref.current?.click();
    };

    async function uploadImage(file: File) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'craabu0n');

        try {
            setUploadingImg(true);
            const res = await fetch("https://api.cloudinary.com/v1_1/dbtwal7ju/image/upload", {
                method: "post",
                body: data,
            });
            const urlData: Record<string, string> = await res.json();
            setUploadingImg(false);

            if (setUploadedAssets) {
                setUploadedAssets((prev) => [...(prev ?? []), urlData.secure_url])
            }
            return urlData
        } catch (e) {
            setUploadingImg(false)
            console.log(e)
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.currentTarget.files ?? []);
        setSelectedFiles(files);
        console.log('files, ', e.target.files)
        await Promise.all(files.map(file => uploadImage(file)));
        setBlobs((prev) => [...(prev ?? []), ...files.map(file => URL.createObjectURL(file))]);
    };

    useEffect(() => {
        return () => {
            setUploadedAssets?.([])
            setBlobs?.([])
        }
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <div
                onClick={handleClick}
                className=" p-4 flex flex-col items-center gap-2 bg-violet-50 text-violet-900 rounded-lg hover:bg-violet-100 cursor-pointer">
                <UploadCloudIcon className="w-6 h-6" />
                <span>Click to upload</span>
                <input
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    type="file"
                    ref={ref}
                    className="hidden"
                    onChange={handleChange}

                />
            </div>
            {/* 6. display selected files */}
            {!!selectedFiles.length && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-md">Selected Files:</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedFiles.map((file, i) => {
                            console.log(file)
                            return (
                                <div key={i} className="flex flex-wrap gap-2 text-violet-900 whitespace-nowrap">
                                    {blobs?.map((blob, i, arr) => {
                                        // If multiple is false, only render the last image
                                        if (!multiple && i !== arr.length - 1) {
                                            return null;
                                        }
                                        return (
                                            <img
                                                key={i}
                                                src={blob}
                                                className={twMerge('w-10 h-10 object-cover rounded-lg', uploadingImg ? 'opacity-50' : 'opacity-100')}
                                            />
                                        )
                                    })}
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FileUpload;
