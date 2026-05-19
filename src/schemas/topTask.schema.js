import mongoose from 'mongoose'

const topTaskSchema = new mongoose.Schema({
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text:    { type: String, required: true, trim: true },
    horizon: { type: String, enum: ['day', 'week', 'month'], required: true },
    done:    { type: Boolean, default: false },
    order:   { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('TopTask', topTaskSchema)
