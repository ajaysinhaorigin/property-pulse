import {
  IAPIMessage,
  IAPIMessageProperty,
  IAPIMessageSender,
} from "../Interfaces"

export class MessageSenderModel {
  id: string = ""
  username: string = ""

  constructor(data?: Partial<MessageSenderModel>) {
    Object.assign(this, data)
  }

  static deserialize(apiData?: IAPIMessageSender) {
    if (!apiData) {
      return new MessageSenderModel()
    }

    const data = {
      ...apiData,
      id: apiData._id,
      username: apiData.username,
    }

    return new MessageSenderModel(data)
  }
}

export class MessagePropertyModel {
  id: string = ""
  name: string = ""

  constructor(data?: Partial<MessagePropertyModel>) {
    Object.assign(this, data)
  }

  static deserialize(apiData?: IAPIMessageProperty) {
    if (!apiData) {
      return new MessagePropertyModel()
    }

    const data = {
      ...apiData,
      id: apiData._id,
      name: apiData.name,
    }

    return new MessagePropertyModel(data)
  }
}

export class MessageModel {
  id: string = ""
  body: string = ""
  email: string = ""
  phone: string = ""
  property: MessagePropertyModel = new MessagePropertyModel()
  read: boolean = false
  recipient: string = ""
  sender: MessageSenderModel = new MessageSenderModel()
  createdAt: string = ""
  updatedAt: string = ""

  constructor(data?: Partial<MessageModel>) {
    Object.assign(this, data)
  }

  static deserialize(apiData?: IAPIMessage): MessageModel {
    if (!apiData) {
      return new MessageModel()
    }

    const data: Partial<MessageModel> = {
      ...apiData,
      id: apiData._id,
      body: apiData.body,
      email: apiData.email,
      phone: apiData.phone,
      property: MessagePropertyModel.deserialize(apiData.property),
      read: apiData.read,
      recipient: apiData.recipient,
      sender: MessageSenderModel.deserialize(apiData.sender),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    }

    return new MessageModel(data)
  }

  static deserializeList(apiData: IAPIMessage[]): MessageModel[] {
    return apiData.map((item) => MessageModel.deserialize(item))
  }
}
