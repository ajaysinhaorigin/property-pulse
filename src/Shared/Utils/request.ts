import { PropertyModel } from "../Models"

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

// Fetch all properties
async function getProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return []
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    return PropertyModel.deserializeList(data.properties)
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getProperty(id: string) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null
    }

    const res = await fetch(`${apiDomain}/properties/${id}`)

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await res.json()
    return PropertyModel.deserialize(data)
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getProperties, getProperty }
