import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env");
  process.exit(1);
}

const PortfolioSchema = new mongoose.Schema({}, { strict: false });
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully.");

    console.log("Reading default data...");
    const rawData = fs.readFileSync(path.join(__dirname, 'src', 'data', 'defaultPortfolio.json'), 'utf8');
    const data = JSON.parse(rawData);

    console.log("Clearing old data...");
    await Portfolio.deleteMany({});

    console.log("Inserting new default data...");
    await Portfolio.create(data);

    console.log("✅ Seed complete! Your MongoDB is now populated with the default portfolio data.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
}

seed();
