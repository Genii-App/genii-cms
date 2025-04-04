import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {PublishAndBroadcastAction} from './actions'
import {sanityDataset, sanityProjectId} from './env'

export default defineConfig({
  name: 'default',
  title: 'Genii CMS',

  projectId: sanityProjectId,
  dataset: sanityDataset,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      // Only add the action for documents of type "movie"
      return context.schemaType === 'notification' ? [PublishAndBroadcastAction, ...prev] : prev
    },
  },
})
