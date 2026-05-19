import mongoose from 'mongoose'

const dayTaskSchema = new mongoose.Schema({
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text:         { type: String, required: true, trim: true },
    type:         { type: String, enum: ['simple', 'priority', 'deadline', 'recurring'], default: 'simple' },
    done:         { type: Boolean, default: false },
    priority:     { type: String, enum: ['high', 'medium', 'low'], default: null },
    deadline:     { type: String, default: null },   // "HH:mm"
    recurring:    { type: String, enum: ['daily', 'weekly', 'monthly'], default: null },
    scheduledFor: { type: Date, required: true },    // date this task belongs to
    order:        { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('DayTask', dayTaskSchema)
