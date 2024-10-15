import type { Metadata } from "next"
import { AuthProvider, Footer, Navbar } from "@/Shared"
import "../Shared/Styles/global.styles.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  )
}
