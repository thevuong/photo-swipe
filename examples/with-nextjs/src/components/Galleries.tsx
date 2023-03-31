'use client';
import { cva, VariantProps } from 'cva';
import React, { FC, HTMLAttributes } from 'react';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Galleries
 * ------------------------------------------------------------------------------------------------------------------ */

const galleriesVariants = cva('');

type GalleriesVariantProps = VariantProps<typeof galleriesVariants>;

export interface GalleriesProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof GalleriesVariantProps>,
    GalleriesVariantProps {}

export const Galleries: FC<GalleriesProps> = ({ className, ...props }) => {
  const galleryRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!galleryRef.current) {
      return;
    }

    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: 'a',
      pswpModule: PhotoSwipe,
    });

    lightbox.init();
  }, []);

  return (
    <div {...props} ref={galleryRef} className={galleriesVariants({ className })}>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-2.5">
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg"
        >
          <img
            alt="5.39"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/zKOLGC6s6Ieyy7oMl0GT6PTR9VM.jpg"
        >
          <img
            alt="5.39"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/zKOLGC6s6Ieyy7oMl0GT6PTR9VM.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/74q0L86HV4ifAO0rSRD64iWhVVH.jpg"
        >
          <img
            alt="5.322"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/74q0L86HV4ifAO0rSRD64iWhVVH.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="1280"
          data-pswp-height="720"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/kyxUKnHm0zlbg4iCSGjKm0Xj3Q0.jpg"
        >
          <img
            alt="5.312"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/kyxUKnHm0zlbg4iCSGjKm0Xj3Q0.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/xesn2yqNvezKyMXon8Aam4QZane.jpg"
        >
          <img
            alt="5.312"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/xesn2yqNvezKyMXon8Aam4QZane.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/e8BCc8Jk11dnSffI6ElICLePvLZ.jpg"
        >
          <img
            alt="5.27"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/e8BCc8Jk11dnSffI6ElICLePvLZ.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/h8gHn0OzBoaefsYseUByqsmEDMY.jpg"
        >
          <img
            alt="5.264"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/h8gHn0OzBoaefsYseUByqsmEDMY.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="3840"
          data-pswp-height="2160"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/qZ2hD8f3aMaIDI9Bj65n0rLBOvN.jpg"
        >
          <img
            alt="5.258"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/qZ2hD8f3aMaIDI9Bj65n0rLBOvN.jpg"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          data-pswp-width="2276"
          data-pswp-height="1280"
          className="max-w-full"
          href="https://image.tmdb.org/t/p/original/t6kyaYb3YAJVoWi0SGbqzkMkAMc.jpg"
        >
          <img
            alt="5.258"
            loading="lazy"
            width="533"
            height="300"
            decoding="async"
            data-nimg="1"
            className="bg-neutral-200 dark:bg-neutral-800 aspect-[533/300] w-[430px] rounded-lg"
            src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/t6kyaYb3YAJVoWi0SGbqzkMkAMc.jpg"
          />
        </a>
      </div>
    </div>
  );
};
