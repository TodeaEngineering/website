'use client';

import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';

export default function BlogImage(props: ComponentPropsWithoutRef<'img'>) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const alt = props.alt ?? '';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt ? `Zoom in on ${alt}` : 'Zoom in on image'}
        className="my-8 block relative left-1/2 -translate-x-1/2 max-w-full xl:max-w-[calc(100%+150px)] 2xl:max-w-[calc(100%+250px)] cursor-zoom-in p-0 bg-transparent border-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img {...props} alt={alt} className="my-0 block h-auto w-full rounded-md" />
      </button>
      {mounted && open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt || 'Image preview'}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8 cursor-zoom-out"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                aria-label="Close image preview"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                ×
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                {...props}
                alt={alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full h-auto w-auto object-contain rounded-md cursor-default bg-white p-4 sm:p-6"
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
