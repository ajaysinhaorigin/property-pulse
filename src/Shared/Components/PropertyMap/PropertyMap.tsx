/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Image from "next/image"
import Spinner from "../Spinner/Spinner"
import { Pin } from "@/Assets"

import L from "leaflet"

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Props {
  property: any
}

const PropertyMap = ({ property }: Props) => {
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  })
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)

  useEffect(() => {
    getCoordinates()
  }, [])

  const getCoordinates = async () => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}&api_key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}`
      )
      const data = await response.json()
      if (!Boolean(data.length)) {
        setGeocodeError(true)
        setLoading(false)
        return
      }
      console.log("data", data)
      const filteredData = data.find((item: any) => item.lat && item.lon)

      console.log("filteredData", filteredData)
      setCoordinates({
        lat: filteredData.lat,
        lng: filteredData.lon,
      })
      setAddress(
        property.location.street +
          " " +
          property.location.city +
          " " +
          property.location.state +
          " " +
          property.location.zipcode
      )
      setLoading(false)
      setGeocodeError(false)
    } catch (error) {
      console.log("error", error)
      setGeocodeError(true)
    }
  }

  console.log(
    "location",
    `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
  )
  if (loading) return <Spinner />

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>{address}</Popup>
        <Image src={Pin} alt="location" width={40} height={40} />
      </Marker>
    </MapContainer>
  )
}
export default PropertyMap
