import mongoose from 'mongoose'

const goalItemSchema = new mongoose.Schema({
    text:  { type: String, required: true, trim: true },
    done:  { type: Boolean, default: false },
    order: { type: Number, default: 0 },
}, { _id: true })

const goalSchema = new mongoose.Schema({
    userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title:         { type: String, required: true, trim: true },
    icon:          { type: String, default: '🎯' },
    accentColor:   { type: String, default: '#C6FF00' },
    description:   { type: String, default: '' },
    progressStyle: { type: String, enum: ['bar', 'ring', 'count'], default: 'bar' },
    type:          { type: String, enum: ['open', 'deadline'], default: 'open' },
    deadline:      { type: String, default: null },
    pinned:        { type: Boolean, default: false },
    coverImage:    { type: String, default: null },
    items:         { type: [goalItemSchema], default: [] },
    order:         { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Goal', goalSchema)
