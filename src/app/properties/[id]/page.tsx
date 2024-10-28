"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"
import {
  BookmarkButton,
  PropertyContactForm,
  PropertyDetails,
  PropertyHeaderImage,
  PropertyImages,
  PropertyModel,
  ShareButtons,
  Spinner,
} from "@/Shared"
import { apiUrls } from "@/Shared/Tools"

const PropertyPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState<PropertyModel>(new PropertyModel())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPropertyData()
  }, [id])

  const fetchPropertyData = async () => {
    try {
      const response = await fetch(`${apiUrls.properties}/${id}`)
      const property = await response.json()
      setProperty(property)
    } catch (error) {
      console.error("Error fetching property:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    )
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  )
}
export default PropertyPage
