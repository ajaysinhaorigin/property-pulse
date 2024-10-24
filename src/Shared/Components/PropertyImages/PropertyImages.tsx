"use client"
import "photoswipe/style.css"
import { useEffect } from "react"
import PhotoSwipeLightbox from "photoswipe/lightbox"
import Image from "next/image"
interface Props {
  images: string[]
}

const PropertyImages = ({ images }: Props) => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
    }
  }, [])

  return (
      <section id="gallery" className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <a href={images[0]} data-pswp-width="1000" data-pswp-height="600">
              <Image
                src={images[0]}
                alt=""
                className="object-cover h-[400px] mx-auto rounded-xl"
                width={1800}
                height={400}
                priority={true}
              />
            </a>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                  ${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }
                `}
                >
                  <a href={image} data-pswp-width="1000" data-pswp-height="600">
                    <Image
                      src={image}
                      alt=""
                      className="object-cover h-[400px] w-full rounded-xl"
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority={true}
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
  )
}
export default PropertyImages
