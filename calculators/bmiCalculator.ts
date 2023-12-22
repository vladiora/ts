import { areValidNumArgs } from "./utils";

interface BmiValues {
    height: number,
    weight: number
}

const parseBmiArgs = (args: string[]): BmiValues => {

    const {isValid, message} = areValidNumArgs(args, 4, 4);

    if (!isValid) {
        throw new Error(message);
    }

    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };
};

export const calculateBmi = (height: number, weight: number): string => {

    if (weight <= 0 || height <= 0)
        throw new Error('Weight or height cannot be 0 or negative.');

    const bmi = weight/((height/100) ** 2);

    if (bmi < 16.0)
        return 'Underweight (Severe thinness)';
    else if (bmi >= 16.0 && bmi <= 16.9)
        return 'Underweight (Moderate thinness)';
    else if (bmi >= 17.0 && bmi <= 18.4)
        return 'Underweight (Mild thinness)';
    else if (bmi >= 18.5 && bmi <= 24.9)
        return 'Normal range';
    else if (bmi >= 25.0 && bmi <= 29.9)
        return 'Overweight (Pre-obese)';
    else if (bmi >= 30.0 && bmi <= 34.9)
        return 'Obese (Class I)';
    else if (bmi >= 35.0 && bmi <= 39.9)
        return 'Obese (Class II)';
    else
        return 'Obese (Class III)';
};

try {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {

    let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage);
}
