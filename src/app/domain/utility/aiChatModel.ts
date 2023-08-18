import {AiMessage} from "./aiMessage";

export interface AiChatModel {
  model: string
  messages: AiMessage[]
  temperature: number
  max_tokens: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
}
