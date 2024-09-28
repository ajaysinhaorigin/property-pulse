import type { Metadata } from "next"
import { Navbar } from "@/Shared"
import "../Shared/Styles/global.styles.css"

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
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
