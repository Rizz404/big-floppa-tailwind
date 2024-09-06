import { forwardRef } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface FileInputProps extends DropzoneOptions {
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  inputSize?: "sm" | "md" | "xl";
  onDropFiles: (file: File[]) => void;
  imageNames?: string[];
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      errorMessage,
      inputSize = "md",
      onDropFiles,
      placeholder,
      imageNames,
      ...props
    },
    ref
  ) => {
    const { getRootProps, getInputProps } = useDropzone({
      ...props,
      onDrop: (acceptedFiles: File[]) => onDropFiles(acceptedFiles),
    });

    const dropzoneClassName = `dropzone ${inputSize} ${
      errorMessage ? "error" : ""
    }`;
    const labelClassName = `label`;
    const errorMessageClassName = `error-message`;

    return (
      <div className="fileinput-container">
        {label && <label className={labelClassName}>{label}</label>}
        <div {...getRootProps({ className: dropzoneClassName })}>
          <input {...getInputProps()} ref={ref} />
          <p>
            {placeholder ||
              "Drag 'n' drop files here, or click to select files"}
          </p>
        </div>
        {imageNames &&
          imageNames.map((name) => (
            <p key={name} className="image-names">
              {name}
            </p>
          ))}
        <span className={errorMessageClassName}>{errorMessage}</span>
      </div>
    );
  }
);

export default FileInput;
