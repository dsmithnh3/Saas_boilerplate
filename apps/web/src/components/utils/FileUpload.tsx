'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection, FileError } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@acme/ui';
import { validateFile, formatFileSize } from '../../utils/fileStorage';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  acceptedTypes = [
    'image/*',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  maxSizeMB = 10,
  multiple = true,
  maxFiles = 5,
  className = '',
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error: FileError) => {
            console.error(`File ${file.name} was rejected:`, error.message);
          });
        });
      }

      const validFiles = acceptedFiles.filter(file => {
        const validation = validateFile(file, acceptedTypes, maxSizeMB);
        if (!validation.isValid) {
          console.error(`File ${file.name} validation failed:`, validation.error);
          return false;
        }
        return true;
      });

      onFilesSelected(validFiles);
    },
    [onFilesSelected, acceptedTypes, maxSizeMB],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple,
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive && !isDragReject ? 'border-primary bg-primary/5' : ''}
          ${isDragReject ? 'border-danger bg-danger/5' : ''}
          ${!isDragActive && !isDragReject ? 'border-muted-foreground/25 hover:border-primary/50' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-2">
          {isDragActive ? (
            <>
              {isDragReject ? (
                <AlertCircle className="h-8 w-8 text-danger" />
              ) : (
                <CheckCircle className="h-8 w-8 text-primary" />
              )}
              <p className="text-sm font-medium">
                {isDragReject ? 'Invalid file type' : 'Drop files here'}
              </p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Drag & drop files here, or click to select</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Accepted types: {acceptedTypes.join(', ')} | Max size: {maxSizeMB}MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  className?: string;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove, className = '' }) => {
  if (files.length === 0) return null;

  return (
    <div className={`mt-4 space-y-2 ${className}`}>
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between p-3 bg-muted rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => onRemove(index)} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
