/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react"
import Spinner from "../Spinner/Spinner"
import PropertyCard from "../PropertyCard/PropertyCard"
import Pagination from "../Pagination/Pagination"
import { apiUrls } from "@/Shared/Tools"
import { PropertyModel } from "@/Shared/Models"

const Properties = () => {
  const [properties, setProperties] = useState<PropertyModel[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize,setPageSize] = useState(9)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchProperties()
  }, [page, pageSize])

  const fetchProperties = async () => {
    try {
      const res = await fetch(
        `${apiUrls.properties}?page=${page}&pageSize=${pageSize}`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await res.json()
      setProperties(PropertyModel.deserializeList(data.properties))
      setTotalItems(data.total)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <PropertyCard key={i} property={property} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
}
export default Properties
