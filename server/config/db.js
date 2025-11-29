const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 [DATABASE] Attempting to connect to MongoDB...');
    console.log('🔄 [DATABASE] URI:', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@') : 'Not set');

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ [DATABASE] MongoDB Connected Successfully!');
    console.log(`✅ [DATABASE] Host: ${conn.connection.host}`);
    console.log(`✅ [DATABASE] Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ [DATABASE] Connection Error:', error.message);
    console.error('❌ [DATABASE] Stack:', error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
