/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProperties, PropertyCard } from "@/Shared"

const Properties = async () => {
  const properties = await getProperties()
  console.log("properties", properties.properties.length)

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
