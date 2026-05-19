import PersonalQuote from '../../schemas/personalQuote.schema.js'
import { ErrorInstance } from '../../config/error.config.js'

function norm(doc) {
    const { _id, __v, userId, ...rest } = doc
    return { id: _id.toString(), ...rest }
}

const list = async (userId) => {
    const docs = await PersonalQuote.find({ userId }).sort({ createdAt: -1 }).lean()
    return docs.map(norm)
}

const create = async (userId, data) => {
    const { text, author = '' } = data
    if (!text?.trim()) throw new ErrorInstance('El texto es obligatorio', 400)
    const doc = await new PersonalQuote({ userId, text: text.trim(), author: author.trim() }).save()
    return norm(doc.toObject())
}

const remove = async (userId, id) => {
    const deleted = await PersonalQuote.findOneAndDelete({ _id: id, userId })
    if (!deleted) throw new ErrorInstance('Frase no encontrada', 404)
    return { message: 'Eliminada' }
}

const personalQuoteModel = { list, create, remove }
export default personalQuoteModel
