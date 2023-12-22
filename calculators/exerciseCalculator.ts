import { areValidNumArgs } from "./utils";

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseArgs {
    dailyHours: number[],
    target: number
}

const parseExercArgs = (args: string[]): ExerciseArgs => {

    const {isValid, message} = areValidNumArgs(args, false, 4);

    if (!isValid) {
        throw new Error(message);
    }

    return {
        target: Number(args[2]),
        dailyHours: args.slice(3).map((str) => Number(str))
    };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {

    if (target < 0) {
        throw new Error('Target hours cannot be a negative number.');
    }

    const workingHours = dailyHours.filter(num => num !== 0); // remove days withouth exercise

    const average = dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/dailyHours.length;

    const res = {periodLength: dailyHours.length, trainingDays: workingHours.length, average: average, target: target};

    if (average >= target) {
        return {...res, success: true, rating: 3, ratingDescription: 'Well done! You achieved your goal!'};
    } else if(average > (target / 2)) {
        return {...res, success: false, rating: 2, ratingDescription: 'You achieved more than 50% of your target, keep working!'};
    } else {
        return {...res, success: false, rating: 1, ratingDescription: 'You suck at exercising. :)'};
    }
};

try {
    const {target, dailyHours} = parseExercArgs(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {

    let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage);
}