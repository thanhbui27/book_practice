import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(5),
    userId: vine.number(),
    year_of_publicaion: vine.string(),
    price: vine.number(),
    abridge: vine.string().maxLength(255),
  })
)

export const validIdBook = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
