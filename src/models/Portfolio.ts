import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  // Using strict: false allows infinite flexibility for the user to add anything
}, { strict: false });

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
