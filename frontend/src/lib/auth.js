import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Khoj';

// Global cached Mongo client for Next.js hot-reloading
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || 'khoj_better_auth_ultra_secret_key_2026_jwt_session',
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
      enabled: true
    }
  },
  user: {
    additionalFields: {
      location: {
        type: 'string',
        required: false,
        defaultValue: 'Dhaka, Bangladesh'
      },
      hasShop: {
        type: 'boolean',
        required: false,
        defaultValue: false
      },
      shopId: {
        type: 'string',
        required: false,
        defaultValue: null
      }
    }
  }
});
