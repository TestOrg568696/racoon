import Personnummer from 'personnummer'
import { ChangeEventHandler, useState } from 'react'
import { InputField } from 'ui'
import { SsnSeField as SsnSeFieldType } from '@/services/PriceForm/Field.types'
import { useTranslateTextLabel } from './useTranslateTextLabel'

type SsnSeFieldProps = {
  field: SsnSeFieldType
}

export const SsnSeField = ({ field }: SsnSeFieldProps) => {
  const translateLabel = useTranslateTextLabel({ data: {} })
  const [value, setValue] = useState(field.defaultValue)

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let value = event.target.value

    if (typeof value === 'string' && Personnummer.valid(value)) {
      value = Personnummer.parse(value).format(true)
    }
    setValue(value)
  }

  return (
    <>
      <input
        type="text"
        name={field.name}
        required={field.required}
        value={value}
        readOnly
        hidden
      />
      <InputField
        type="text"
        name={`${field.name}-visible-input`}
        label={field.label ? translateLabel(field.label) : undefined}
        minLength={10}
        maxLength={13}
        required={field.required}
        onChange={handleOnChange}
      />
    </>
  )
}
