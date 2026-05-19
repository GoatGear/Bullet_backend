import mongoose from 'mongoose'

const broadcastSchema = new mongoose.Schema({
    title:      { type: String, default: '' },
    content:    { type: String, required: true, trim: true },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    readBy:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

export default mongoose.model('Broadcast', broadcastSchema)
