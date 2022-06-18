type Placeholder = { key: string; pattern: string }
export type TextLabel = { key: string; placeholders?: Array<Placeholder> }

type InputBase = {
  name: string
  label: TextLabel
  placeholder?: TextLabel
  defaultValue?: string
  required?: boolean
}

type InputText = InputBase & { type: 'text'; pattern?: string }
type InputNumber = InputBase & { type: 'number'; min?: number; max?: number }
type InputSelect = InputBase & {
  type: 'select'
  options: Array<{ name: TextLabel; value: string }>
}

export type Input = InputText | InputNumber | InputSelect

type InputGroupState = 'IDLE' | 'INVALID' | 'VALID'

type InputGroup = {
  id: string
  title: TextLabel
  inputs: Array<Input>
  state: InputGroupState
  summary: {
    labels: Array<TextLabel>
  }
}

export type PriceForm = {
  groups: Array<InputGroup>
}
