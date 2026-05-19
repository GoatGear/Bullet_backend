import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content:  { type: String, default: '' },
    color:    { type: String, default: 'yellow' },
    x:        { type: Number, default: 0 },
    y:        { type: Number, default: 0 },
    archived: { type: Boolean, default: false },
    order:    { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Note', noteSchema)
