"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { apiUrls } from "@/Shared/Tools"
import { ProfileDefault } from "@/Assets"
import { PropertyModel } from "@/Shared/Models"
import Spinner from "../Spinner/Spinner"

const Profile = () => {
  const { data: session }: any = useSession()
  const profileImage = session?.use?.image
  const profileName = session?.user?.name
  const profileEmail = session?.user?.email
  const userId = session?.user?.id

  const [properties, setProperties] = useState<PropertyModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    fetchUserProperties(userId)
  }, [userId])

  const fetchUserProperties = async (userId: string) => {
    if (!userId) {
      return
    }

    try {
      const res = await fetch(`${apiUrls.properties}/user/${userId}`)
      if (res.status === 200) {
        const data = await res.json()
        setProperties(PropertyModel.deserializeList(data))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    )

    if (!confirmed) return

    try {
      const res = await fetch(`${apiUrls.properties}/${propertyId}`, {
        method: "DELETE",
      })

      if (res.status === 200) {
        // Remove the property from state
        const updatedProperties = properties.filter(
          (property: any) => property.id !== propertyId
        )

        setProperties(updatedProperties)
        toast.success("Property Deleted")
      } else {
        toast.error("Failed to delete property")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete property")
    }
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || ProfileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {loading ? (
                <Spinner />
              ) : (
                properties.map((property: any) => (
                  <div key={property.id} className="mb-10">
                    <Link href={`/properties/${property.id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property.id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Profile
