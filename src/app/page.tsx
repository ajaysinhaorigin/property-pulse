import connectDB from "@/Config/dbConnection"
import { Hero, HomeProperties, InfoBoxes } from "@/Shared"

const Home = async () => {
  await connectDB()
  console.log(process.env.MONGODB_URI)
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  )
}

export default Home
