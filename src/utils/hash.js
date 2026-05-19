import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 11

const hash    = async (text)       => bcrypt.hash(text, SALT_ROUNDS)
const compare = async (text, hash) => bcrypt.compare(text, hash)

export const hashUtils = { hash, compare }
