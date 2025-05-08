import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'

export default defineConfig({
  name: 'default',
  title: 'shie-villa',

  projectId: '8dqnw4ej',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    simplerColorInput({
    defaultColorFormat: 'rgba',
    defaultColorList: [
      { label: 'Light', value: '#ffffff' },
      { label: 'Dark', value: '#333333' },
      { label: 'red', value: '#e7000c' },
    ],
    enableSearch: true,
  })],

  schema: {
    types: schemaTypes,
  },
})
