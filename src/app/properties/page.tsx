/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { PropertyCard } from "@/Shared"

async function getProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)

    if (!res.ok) {
      throw new Error("Failed to fetch properties")
    }
    return res.json()
  } catch (error) {
    console.log("erorr", error)
  }
}

const Properties = async () => {
  const properties = await getProperties()
  console.log('properties', properties.properties.length)

    // properties.properties.sort((a: any, b:any) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.properties.map((property: any) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Properties
