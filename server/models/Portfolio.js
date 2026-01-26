const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    assets: [{
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Asset'
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

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;