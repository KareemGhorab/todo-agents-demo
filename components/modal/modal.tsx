"use client";

import { useEffect, useId } from "react";
import clsx from "clsx";

import Button from "@/components/button/button";
import styles from "./modal.module.css";

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const Modal: React.FC<Props> = ({ title, onClose, children, actions }) => {
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={clsx(
          "w-full max-w-md border border-primary-400 bg-white p-6",
          styles.modal
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="mb-4 text-2xl">
          {title}
        </h2>
        <div className="mb-6 text-xl">{children}</div>
        {actions ? (
          <div className="flex justify-end gap-3">{actions}</div>
        ) : (
          <div className="flex justify-end">
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
