const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

console.log('Testing connection to:', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

client.connect()
    .then(() => {
        console.log('✅ Connection successful!');
        return client.end();
    })
    .catch(err => {
        console.error('❌ Connection failed:', err.message);
        console.error('Full error:', err);
        process.exit(1);
    });
