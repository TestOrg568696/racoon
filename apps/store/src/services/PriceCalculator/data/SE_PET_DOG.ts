import { LAYOUT, ssnSeSection, yourAddressSection } from '@/services/PriceCalculator/formFragments'
import { setI18nNamespace, tKey } from '@/utils/i18n'
import { Template } from '../PriceCalculator.types'

setI18nNamespace('purchase-form')

export const SE_PET_DOG: Template = {
  name: 'SE_PET_DOG',
  sections: [
    ssnSeSection,
    {
      id: 'your-dog',
      title: { key: tKey('SECTION_TITLE_YOUR_DOG') },
      submitLabel: { key: tKey('SUBMIT_LABEL_PROCEED') },
      items: [
        {
          field: {
            type: 'text',
            name: 'name',
            label: { key: tKey('FIELD_NAME_PET_LABEL') },
            required: true,
          },
          layout: LAYOUT.FULL_WIDTH,
        },
        // TODO: replace with custom breed field
        {
          field: {
            type: 'text',
            name: 'breed',
            label: { key: tKey('FIELD_BREED_LABEL') },
            required: true,
          },
          layout: LAYOUT.FULL_WIDTH,
        },
        {
          field: {
            type: 'radio',
            name: 'gender',
            label: { key: tKey('FIELD_GENDER_LABEL') },
            options: [
              { label: { key: tKey('FIELD_GENDER_OPTION_MALE_DOG') }, value: 'male' },
              { label: { key: tKey('FIELD_GENDER_OPTION_FEMALE_DOG') }, value: 'female' },
            ],
            required: true,
          },
          layout: LAYOUT.FULL_WIDTH,
        },
        // TODO: verify field type
        {
          field: {
            type: 'date',
            name: 'birthDate',
            label: { key: tKey('FIELD_BIRTH_DATE_PET_LABEL') },
            required: true,
          },
          layout: LAYOUT.FULL_WIDTH,
        },
        {
          field: {
            type: 'radio',
            name: 'isNeutered',
            label: { key: tKey('FIELD_IS_NEUTERED_DOG_LABEL') },
            options: [
              { label: { key: tKey('LABEL_YES') }, value: 'true' },
              { label: { key: tKey('LABEL_NO') }, value: 'false' },
            ],
            required: true,
          },
          layout: LAYOUT.FULL_WIDTH,
        },
        {
          field: {
            type: 'radio',
            name: 'previousDogOwner',
            label: { key: tKey('FIELD_PREVIOUS_DOG_OWNER_LABEL') },
            options: [
              { label: { key: tKey('LABEL_YES') }, value: 'true' },
              { label: { key: tKey('LABEL_NO') }, value: 'false' },
            ],
            required: true,
          },
          layout: LAYOUT.FULL_WIDTH,
        },
      ],
    },
    yourAddressSection,
  ],
}