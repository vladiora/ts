interface Valid {
	isValid: boolean,
	message: string
}

export const areValidNumArgs = (args: string[], max: number | boolean, min: number): Valid => {

	if (args.length < min) {
		return { isValid: false, message: 'Not enough arguments' };
	}
	if (max && args.length > Number(max)) {
		return { isValid: false, message: 'Too many arguments' };
	}

	for (let i = 2; i < args.length; i++) {
		if (isNaN(Number(args[i]))) {
			return { isValid: false, message: 'Not all arguments are numbers' };
		}
	}

	return {isValid: true, message: 'Arguments are valid'};
};
