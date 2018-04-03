const Animal = require("../models/Animal");

const rules = require("../resources/learningRules.json");

function getNewConfig({ id, food, time }) {
    return Animal.findById(id)
        .then( animal => {
            const foodPromise = generateNewFood(id, food, animal.food);
            const timePromise = generateNewTime(id, time, animal.time);

            return Promise.all([foodPromise, timePromise]);
        })
        .then( ([newFood, newTime]) => {
            return Animal.findByIdAndUpdate(id, { time: newTime, food: newFood }, { new: true })
                    .then( animal => Promise.resolve(animal) )
                    .catch( err => Promise.reject(err) );
        })
        .catch( err => Promise.reject(err) );
} 

function generateNewFood(id, lastFood, currFoodObj) {
    return new Promise((resolve, reject) => {
        const foodLeft = 100 - lastFood; // %
        let newFood = currFoodObj;
        
        if (foodLeft <= rules.foodLeft.none) {
            newFood.normal = Math.round(currFoodObj.normal * 1.05);
        } else if (foodLeft > rules.foodLeft.little) {
            newFood.normal = Math.round(currFoodObj.normal * 0.9);
        }

        if (newFood.normal > currFoodObj.max) {
            newFood.normal = currFoodObj.max;
        }

        if (newFood.normal < currFoodObj.min) {
            newFood.normal = currFoodObj.min;
        }

        return resolve(newFood);
    });
}

function generateNewTime(id, lastTime, currTimeObj) {
    return new Promise((resolve, reject) => {
        const timePassed = (lastTime / currTimeObj.normal) * 100; // %
        let newTime = currTimeObj;

        if (timePassed <= rules.timePassed.less) {
            newTime.normal = Math.round(currTimeObj.normal * 0.9);
        } else if (timePassed > rules.timePassed.normal) {
            newTime.normal = Math.round(currTimeObj.normal * 1.1);
        }

        if (newTime.normal > currTimeObj.max) {
            newTime.normal = currTimeObj.max;
        }

        if (newTime.normal < currTimeObj.min) {
            newTime.normal = currTimeObj.min;
        }

        return resolve(newTime);
    });
}

module.exports = exports = {
    getNewConfig
};