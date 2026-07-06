/**
 * ============================================
 * Gan Engine
 * Gann Square of Nine Engine
 * Version: 0.3.0 (Euler)
 * ============================================
 *
 * Purpose:
 * Calculates mathematical Gann Square of Nine
 * levels using the day's opening price.
 *
 * Philosophy:
 * - No prediction
 * - No AI
 * - No machine learning
 * - Pure deterministic mathematics
 *
 * The same opening price will always
 * produce the same mathematical levels.
 */

// Default angles for Beta v0.3
const DEFAULT_ANGLES = [45, 90];

/**
 * Converts an angle into a Gann step.
 *
 * Example:
 * 45°  -> 0.125
 * 90°  -> 0.25
 */
function angleToStep(angle) {
    return angle / 360;
}

/**
 * Main Gan Engine
 *
 * @param {number} openingPrice
 * @param {number[]} angles
 *
 * @returns {object}
 */
function calculateLevels(openingPrice, angles = DEFAULT_ANGLES) {

    if (
        typeof openingPrice !== "number" ||
        openingPrice <= 0
    ) {
        throw new Error(
            "Opening price must be greater than zero."
        );
    }

    const root = Math.sqrt(openingPrice);

    const levels = angles.map(angle => {

        const step = angleToStep(angle);

        const lower = Math.pow(root - step, 2);

        const upper = Math.pow(root + step, 2);

        return {

            angle,

            lower: Number(lower.toFixed(2)),

            upper: Number(upper.toFixed(2))

        };

    });

    return {

        method: "Square of Nine",

        version: "1.0",

        openingPrice,

        levels

    };

}

module.exports = {
    calculateLevels
};