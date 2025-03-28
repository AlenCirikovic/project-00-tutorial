const FileType = import('file-type')
import fs from 'fs'
import { diskStorage, Options } from 'multer'
import { extname } from 'path'

type validFileExtensionsType = 'png' | 'jpg' | 'jpeg'
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg'

const validFileExtensions: validFileExtensionsType[] = ['png', 'jpg', 'jpeg']
const validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg']

export const saveImageToStorage: Options = {
  storage: diskStorage({
    destination: './files',
    filename(req, file, callback) {
      // Create unique suffix
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      // Get file extension
      const ext = extname(file.originalname)
      // Write filename
      const filename = `${uniqueSuffix}${ext}`
      callback(null, filename)
    },
  }),
}
