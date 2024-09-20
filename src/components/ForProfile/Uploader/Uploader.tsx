"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./uploader.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { IconPlus } from "@/assets";
import Image from "next/image";
import cn from "classnames";

interface UploaderProps {
  register: UseFormRegisterReturn;
  errors: string | undefined;
  className?: string;
  onUpload: (file: File) => void;
  previewUrl?: string | null;
}

export const Uploader = ({
  register,
  errors,
  className,
  onUpload,
  previewUrl,
}: UploaderProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { ref: registerRef, ...rest } = register;

  useEffect(() => {
    setPreview(previewUrl ? previewUrl : undefined);
  }, [previewUrl]);

  const handleUploadedFile = (file: File) => {
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    setSelectedFile(file);
    onUpload(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUploadedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleUploadedFile(file);
    }
  };

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <>
      <div
        className={cn(styles.uploader, {
          [styles.uploader__dragging]: isDragging,
        })}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          {...rest}
          className={styles.uploader__input}
          type="file"
          onChange={handleFileChange}
          ref={(e) => {
            registerRef(e);
            fileRef.current = e;
          }}
          accept="image/*"
          hidden
        />

        {preview && selectedFile ? (
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            priority
          />
        ) : (
          <>
            <IconPlus className={styles.uploader__icon} />
            <p className={styles.uploader__previewText}>
              Перетягніть фотографію сюди або натисніть, щоб вибрати
            </p>
          </>
        )}
      </div>

      {errors && <span className={styles.uploader__error}>{errors}</span>}
    </>
  );
};
