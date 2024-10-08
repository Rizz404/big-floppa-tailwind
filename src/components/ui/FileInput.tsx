import { forwardRef } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import clx from "clsx";

interface FileInputProps extends DropzoneOptions {
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  inputSize?: "sm" | "md" | "xl";
  onDropFiles: (file: File[]) => void;
  imageNames?: string[];
  containerClassName?: string; // Tambahkan prop untuk class container
}

const fileInputSizeStyles = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-2 px-3",
  xl: "text-lg py-3 px-4",
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      errorMessage,
      inputSize = "md",
      onDropFiles,
      placeholder,
      imageNames,
      containerClassName, // Ambil prop containerClassName
      ...props
    },
    ref,
  ) => {
    const { getRootProps, getInputProps } = useDropzone({
      ...props,
      onDrop: (acceptedFiles: File[]) => onDropFiles(acceptedFiles),
    });

    // Gunakan `clx` untuk menggabungkan class default dan class dari props
    const styles = {
      inputStyle: clx(
        "w-full rounded border border-dashed cursor-pointer",
        fileInputSizeStyles[inputSize],
        errorMessage ? "border-red-500" : "border-gray-500",
        containerClassName, // Tambahkan className yang diberikan
      ),
    };

    return (
      <div>
        {label && <label className="mb-1 block font-medium">{label}</label>}
        <div {...getRootProps({ className: styles.inputStyle })}>
          <input {...getInputProps()} ref={ref} />
          <p>
            {placeholder ||
              "Drag 'n' drop files here, or click to select files"}
          </p>
        </div>
        {imageNames &&
          imageNames.map((name) => (
            <p key={name} className="">
              {name}
            </p>
          ))}
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      </div>
    );
  },
);

export default FileInput;
