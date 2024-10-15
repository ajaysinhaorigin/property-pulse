const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function getProperties() {
  try {
    if (!apiDomain) {
      return []
    }

    const res = await fetch(`${apiDomain}/properties`,
      {
        cache:'no-store'
      }
    )

    console.log("res--------------------", res)

    if (!res.ok) {
      throw new Error("Failed to fetch properties")
    }
    return res.json()
  } catch (error) {
    console.log("erorr", error)
    return []
  }
}

async function getProperty(id: string) {
  try {
    if (!apiDomain) {
      return []
    }

    const res = await fetch(`${apiDomain}/properties/${id}`)

    if (!res.ok) {
      throw new Error("Failed to fetch properties")
    }
    return res.json()
  } catch (error) {
    console.log("erorr", error)
    return []
  }
}

export { getProperties, getProperty }
