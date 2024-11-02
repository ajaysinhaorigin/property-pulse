export interface IAPIMessageSender {
  _id: string
  username: string
}

export interface IAPIMessageProperty {
  _id: string
  name: string
}

export interface IAPIMessage {
  _id: string
  body: string
  email: string
  phone: string
  property: IAPIMessageProperty
  read: boolean
  recipient: string
  sender: IAPIMessageSender
  createdAt: string
  updatedAt: string
}
