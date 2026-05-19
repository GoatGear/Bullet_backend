import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:             { type: String, required: true, trim: true },
    email:            { type: String, required: true, trim: true, unique: true, lowercase: true },
    password:         { type: String, required: true },
    role:             { type: String, enum: ['user', 'admin'], default: 'user' },
    suspended:             { type: Boolean, default: false },
    notificationsEnabled:  { type: Boolean, default: true },
    resetToken:       { type: String,  default: null },
    resetTokenExpiry: { type: Date,    default: null },
    quoteSettings: {
        categories:   { type: [String], default: ['motivacional', 'filosofía', 'humor', 'informal', 'disciplina'] },
        personalOnly: { type: Boolean,  default: false },
    },
    audit: {
        registration_ip:         { type: String },
        registration_user_agent: { type: String },
    },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
