import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

try {
  await mongoClient.connect();
  console.log('Sucess: MongoDB is connected!')
} catch (error) {
  console.log(error.message);
}
db = mongoClient.db();

export const usersCollection = db.collection('users')
export const sessionsCollection = db.collection('sessions')
export const productsCollection = db.collection('products')
export const sliderCollection = db.collection('slider')

