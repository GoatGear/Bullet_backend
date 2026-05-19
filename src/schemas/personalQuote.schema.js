import mongoose from 'mongoose'

const personalQuoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text:   { type: String, required: true, maxlength: 500, trim: true },
    author: { type: String, default: '', trim: true },
}, { timestamps: true })

export default mongoose.model('PersonalQuote', personalQuoteSchema)
