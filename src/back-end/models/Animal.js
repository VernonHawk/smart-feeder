const mongoose = require("mongoose");

const vars = require("../resources/vars");

const animalSchema = mongoose.Schema({
    food: {
        min:    { type: Number, min: vars.food.min, max: this.max,      required: true },
        normal: { type: Number, min: this.min,      max: this.max,      required: true },
        max:    { type: Number, min: this.min,      max: vars.food.max, required: true },
    },
    time: {
        min:    { type: Number, min: vars.time.min, max: this.max,      required: true },
        normal: { type: Number, min: this.min,      max: this.max,      required: true },
        max:    { type: Number, min: this.min,      max: vars.time.max, required: true },
    }
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = exports = Animal;