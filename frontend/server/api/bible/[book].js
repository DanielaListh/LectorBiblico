import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
    const { book } = event.context.params
    const filePath = join(process.cwd(), 'server/data/bible', `${book}.json`)

    try {
        const json = readFileSync(filePath, 'utf-8')
        return JSON.parse(json)
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: `No se encontró el libro: ${book}`,
        })
    }

 })