import { useRouter } from 'next/router'
import { FormEvent, useCallback, useRef } from 'react'
import { useState } from 'react'

type TransitionState = 'idle' | 'submitting'

type FormState = {
  state: TransitionState
  errors: Record<string, string> | null
}

type Options = {
  action: string
  method?: 'put' | 'post' | 'patch' | 'delete'
  onSuccess?: (data: { redirectUrl?: string }) => void
  onSubmit?: (formData: FormData) => void
}

export const useForm = ({ action, method, onSuccess, onSubmit }: Options) => {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>({ state: 'idle', errors: null })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormState({ state: 'submitting', errors: null })

    try {
      const formData = new FormData(event.currentTarget)
      onSubmit?.(formData)

      // @ts-ignore doesn't know about submitter
      if (event.nativeEvent.submitter) {
        // @ts-ignore
        formData.append(event.nativeEvent.submitter.name, event.nativeEvent.submitter.value)
      }

      const response = await fetch(action, {
        method: method || 'post',
        body: formData,
        credentials: 'same-origin',
      })

      if (response.ok) {
        onSuccess?.({ redirectUrl: response.redirected ? response.url : undefined })
        if (response.redirected) {
          const isSuccess = await router.push(response.url)
          if (isSuccess) {
            setFormState({ state: 'idle', errors: null })
          }
        } else {
          setFormState({ state: 'idle', errors: null })
        }
      } else {
        const errors = await response.json()
        setFormState({ state: 'idle', errors })
      }
    } catch (error) {
      setFormState({ state: 'idle', errors: { form: 'Unknown error' } })
    }
  }

  const submitForm = useCallback(() => {
    if (formRef.current?.reportValidity()) {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }
  }, [])

  const formProps = {
    action,
    method,
    onSubmit: handleSubmit,
    ref: formRef,
  }

  return { ...formState, submitForm, formProps }
}
