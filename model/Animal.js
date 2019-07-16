const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  species: {
    type: String,
    required: true,
    max: 255,
    min: 3
  },
  genere: {
    type: String,
    required: true,
    max: 6,
    min: 4
  },
  month: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  cep: {
    type: String,
    required: true,
    min: 8,
    max: 10
  },
  state: {
    type: String,
    required: true,
    min: 2,
    max: 2
  },
  city: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  address: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  description: {
    type: String,
    required: true,
    min: 100,
    max: 255
  },
  feature: {
    type: String,
    required: true,
    min: 10,
    max: 255
  },
  observation: {
    type: String,
    required: false,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Animal", animalSchema);
