import Image from "next/image"
import React from "react"

interface Props {
  image: string
}

const PropertyHeaderImage = ({ image }: Props) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image.includes("http")? image : `/images/properties/${image}`}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImage