import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import clx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "xl";
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  useEffect(() => {
    // * Menambahkan atau menghapus kelas blur pada body saat modal terbuka
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  // * Fungsi untuk mencegah event bubbling agar klik di dalam modal tidak menutup modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // * Jika modal tidak terbuka, tidak perlu merender apa pun
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Modal container */}
      <div
        className={clx(
          "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose} // * Ketika area di luar modal di-klik, modal akan tertutup
      >
        {/* Backdrop blur */}
        <div
          className={clx(
            "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Modal Box */}
        <div
          className={clx(
            "relative z-10 w-full max-w-2xl transform rounded-lg bg-white shadow-lg transition-all duration-300",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0", // * Animasi masuk dan keluar
            className, // * Menggunakan props className untuk extend styling
          )}
          onClick={handleModalClick} // * Mencegah event bubbling
        >
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement, // * Menggunakan portal ke elemen `#modal-root`
  );
};

export default Modal;
