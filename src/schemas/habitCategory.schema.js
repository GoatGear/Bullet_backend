import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
    name:        { type: String, required: true, trim: true },
    completions: { type: [String], default: [] },  // YYYY-MM-DD strings
    order:       { type: Number, default: 0 },
}, { _id: true })

const habitCategorySchema = new mongoose.Schema({
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name:       { type: String, required: true, trim: true },
    icon:       { type: String, default: '📋' },
    activities: { type: [activitySchema], default: [] },
    order:      { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('HabitCategory', habitCategorySchema)
