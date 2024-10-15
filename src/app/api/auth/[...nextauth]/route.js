import NextAuth from "next-auth/next"
// import { authOptions } from "../../../../Shared/Utils/authOptions"
import {authOptions} from "@/Shared"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
