/**
 * ============================================
 * Gan Engine
 * Gann Square of Nine Engine
 * Version: 0.3.0 (Euler)
 * ============================================
 */

const DEFAULT_ANGLES = [45, 90];

function angleToStep(angle) {
    return angle / 360;
}

function calculateLevels(openingPrice, currentPrice, angles = DEFAULT_ANGLES) {

    if (
        typeof openingPrice !== "number" ||
        openingPrice <= 0
    ) {
        throw new Error("Opening price must be greater than zero.");
    }

    if (
        typeof currentPrice !== "number" ||
        currentPrice <= 0
    ) {
        throw new Error("Current price must be greater than zero.");
    }

    const root = Math.sqrt(openingPrice);

    const levels = angles.map(angle => {

        const step = angleToStep(angle);

        const support = Number(Math.pow(root - step, 2).toFixed(2));

        const resistance = Number(Math.pow(root + step, 2).toFixed(2));

        return {

            angle,

            support,

            resistance

        };

    });

    const nearestSupport = levels[0].support;

    const nearestResistance = levels[0].resistance;

    const distanceToSupport =
        Number((((currentPrice - nearestSupport) / currentPrice) * 100).toFixed(2));

    const distanceToResistance =
        Number((((nearestResistance - currentPrice) / currentPrice) * 100).toFixed(2));

    return {

        method: "Square of Nine",

        version: "1.0",

        openingPrice,

        nearestSupport,

        nearestResistance,

        distanceToSupport,

        distanceToResistance,

        levels

    };

}

module.exports = {
    calculateLevels
};