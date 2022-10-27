import { Template } from '../PriceForm.types'

export const SE_CAR: Template = {
  name: 'SE_CAR',
  sections: [
    {
      id: 'your-info',
      title: { key: 'Your info' },
      submitLabel: { key: 'Next step' },
      items: [
        {
          field: {
            type: 'ssn-se',
            name: 'ssn',
            label: { key: 'Personal number' },
            required: true,
          },
          layout: { columnSpan: 6 },
        },
      ],
    },
    {
      id: 'your-car',
      title: { key: 'Your car' },
      submitLabel: { key: 'Next step' },
      items: [
        {
          field: {
            type: 'text',
            name: 'registrationNumber',
            label: { key: 'Registration number' },
            required: true,
          },
          layout: { columnSpan: 6 },
        },
        {
          field: {
            type: 'number',
            name: 'milage',
            label: { key: 'Annual mileage' },
            required: true,
            min: 0,
          },
          layout: { columnSpan: 6 },
        },
      ],
    },
    {
      id: 'your-address',
      title: { key: 'Your address' },
      submitLabel: { key: 'Calculate price' },
      items: [
        {
          field: {
            type: 'text',
            name: 'street',
            label: { key: 'Address' },
            required: true,
          },
          layout: { columnSpan: 4 },
        },
        {
          field: {
            type: 'text',
            name: 'zipCode',
            label: { key: 'Postal code' },
            minLength: 5,
            maxLength: 5,
            required: true,
          },
          layout: { columnSpan: 2 },
        },
      ],
    },
  ],
}
