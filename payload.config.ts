import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Categories } from './src/collections/Categories'
import { Products } from './src/collections/Products'
import { BusinessSettings } from './src/globals/BusinessSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Panel Restaurante | Panda Haus',
    },
  },
  collections: [Users, Media, Categories, Products],
  globals: [BusinessSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'panda-haus-restaurant-master-secret-key-32ch',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurante-template',
    connectOptions: {
      serverSelectionTimeoutMS: 7000,
    },
  }),
  sharp,
})
