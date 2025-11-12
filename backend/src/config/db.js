import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-management';
    
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  WARNING: MONGODB_URI not found in .env file. Using default: mongodb://localhost:27017/fitness-management');
      console.warn('⚠️  Please create a .env file in the backend directory with your MongoDB connection string.');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running on your system');
    console.error('   2. Check your MONGODB_URI in the .env file');
    console.error('   3. For local MongoDB, use: mongodb://localhost:27017/fitness-management');
    console.error('   4. For MongoDB Atlas, use your connection string from Atlas dashboard\n');
    process.exit(1);
  }
};

export default connectDB;

