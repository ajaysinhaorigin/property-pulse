import connectDB from "@/Config/dbConnection"
import { FeaturedProperties, Hero, HomeProperties, InfoBoxes } from "@/Shared"

const Home = async () => {
  await connectDB()
  console.log(process.env.MONGODB_URI)
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  )
}

export default Home
