import React, { forwardRef } from 'react';

type FileUploadProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload: React.ForwardRefExoticComponent<
  FileUploadProps & React.RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, FileUploadProps>(({ children, handleFileChange }, ref) => {
  return (
    <>
      {children}
<<<<<<< HEAD
      <input
        ref={ref}
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
=======
      <input ref={ref} multiple type="file" className="hidden" onChange={handleFileChange} />
>>>>>>> upstream/main
    </>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
