import type { Metadata } from "next"
import "../Shared/Styles/global.styles.css"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider, Footer, Navbar } from "@/Shared"
import { ToastContainer } from "react-toastify"
import { GlobalProvider } from "@/Shared/Context/GlobalContext"

export const metadata: Metadata = {
  title: "Property Pulse | Find Rentals Near You",
  description: "Find Rental properties Near You",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  )
}
