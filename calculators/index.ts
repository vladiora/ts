import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

	const  { height, weight } = req.query;

	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
		return res.status(400).send({error: 'malformatted parameters'});
	}

	try {
		return res.send({height: height, weight: weight, bmi: calculateBmi(Number(height), Number(weight))});
	} catch (error: unknown) {

		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}

		return res.status(400).send({error: errorMessage});
	}

});

app.post('/exercises', (req, res) => {

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	// validate the data here
	if (!target || !daily_exercises) {
		return res.status(400).send({ error: 'parameters missing' });
	}

	if (!(daily_exercises instanceof Array) || isNaN(Number(target))) {
		return res.status(400).send({ error: 'malformatted parameters' });
	}

	try {
		return res.send(calculateExercises(daily_exercises as number[], Number(target)));
	} catch (error: unknown) {

		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}

		return res.status(400).send({error: errorMessage});
	}

});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
