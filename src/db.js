import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_API_K}`, {
            dbName: 'Bullet_Journal'
        });
        console.log('MongoDB conectado: Bullet_Journal');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
}
