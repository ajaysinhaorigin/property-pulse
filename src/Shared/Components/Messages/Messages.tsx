"use client"
import { useState, useEffect } from "react"
import Spinner from "../Spinner/Spinner"
import Message from "./Message"
import { apiUrls } from "@/Shared/Tools"
import { MessageModel } from "@/Shared/Models"

const Messages = () => {
  const [messages, setMessages] = useState<MessageModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    try {
      const res = await fetch(apiUrls.messages)

      if (res.status === 200) {
        const data = await res.json()
        setMessages(MessageModel.deserializeList(data))
      }
    } catch (error) {
      console.log("Error fetching messages: ", error)
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <Message key={message.id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Messages
