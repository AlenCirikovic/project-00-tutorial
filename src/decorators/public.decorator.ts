// Allows routes to be accesible for every user even if not authenticated
import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata('isPublic', true)
