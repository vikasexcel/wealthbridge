const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    investments: [{
        assetName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        purchasePrice: {
            type: Number,
            required: true,
            min: 0
        },
        purchaseDate: {
            type: Date,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field before saving
portfolioSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Error handling for validation
portfolioSchema.post('save', function(error, doc, next) {
    if (error) {
        next(new Error('Error saving portfolio: ' + error.message));
    } else {
        next();
    }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;