import { DiagnosisEntry,
        Discharge,
        Entry,
        EntryWithoutId,
        Gender,
        HealthCheckEntry,
        HealthCheckRating,
        HospitalEntry,
        OccupationalHealthcareEntry,
        PatientEntry,
        SickLeave } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {

    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseDate = (date: unknown): string => {

    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date of birth: ' + date);
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {

    if (!isString(ssn)) {
        throw new Error('Incorrect ssn: ' + ssn);
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {

    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {

    if(!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number';
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {

    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect entry data for health check rating.');
    }

    return rating;
}

const parseString = (str: unknown): string => {

    if (!isString(str)) {
        throw new Error('Incorrect or missing data');
    }

    return str;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<DiagnosisEntry['code']>;
    }

    return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};

const parseType = (type: unknown): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
    if (!isString(type) || !(type ==='HealthCheck' || type === 'Hospital' || type === 'OccupationalHealthcare')) {
        throw new Error('Incorrect type of entry.');
    }

    return type;
};

const parseDischarge = (discharge: unknown): Discharge => {

    if (!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in discharge && 'criteria' in discharge) {
        return {
            date: parseDate(discharge.date),
            criteria: parseString(discharge.criteria)
        }
    } else {
        throw new Error('Incorrect or missing data');
    }
}

const parseSickLeave = (object: object): SickLeave => {

    if ('sickLeave' in object && object.sickLeave && typeof object.sickLeave === 'object' && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave) {
        return {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate)
        }
    } else {
        throw new Error('Incorrect or missing data in sick leave');
    }
}

export const toNewEntry = (object: unknown): EntryWithoutId => {

    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {

        const newEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: parseType(object.type),
            diagnosisCodes: parseDiagnosisCodes(object)
        };

        switch (newEntry.type) {
            case "Hospital":

                if ('discharge' in object) {
                    return {...newEntry, discharge: parseDischarge(object.discharge)} as Omit<HospitalEntry, "id">;
                } else {
                    throw new Error('Incorrect entry data for health check entry.');
                }

            case "HealthCheck":
                if ('healthCheckRating' in object) {
                    return {...newEntry, healthCheckRating: parseHealthCheckRating(object.healthCheckRating)} as Omit<HealthCheckEntry, "id">;
                } else {
                    throw new Error('Incorrect entry data for health check entry.');
                }

            case "OccupationalHealthcare":
                if ('employerName' in object) {
                    return {...newEntry, employerName: parseString(object.employerName), sickLeave: parseSickLeave(object)} as Omit<OccupationalHealthcareEntry, "id">;
                } else {
                    throw new Error('Incorrect entry data for health check entry.');
                }

            default:
                throw new Error('Incorrect entry data for entry.');
        }
    }

    throw new Error('Incorrect or missing data');
};

const isEntry = (entry: unknown): entry is Entry => {

    if (!entry || typeof entry !== 'object') {
        return false;
    }

    if ('type' in entry && isString(entry.type)) {
        if (!(entry.type ==='HealthCheck' || entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare'))
            return false;
    } else {
        return false;
    }

    return true;
};

const parseEntries = (object: object): Entry[] => {

    if (!('entries' in object)) {
        return [] as Entry[];
    }

    if (!Array.isArray(object.entries)) {
        throw new Error('Incorrect entries data');
    }

    for (let entry of object.entries) {
        if (!isEntry(entry))
            throw new Error('Incorrect or missing Entry');
    }

    return object.entries as Entry[];
};

export const toNewPatient = (object: unknown): Omit<PatientEntry, 'id'> => {

    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object)
        };
    }

    throw new Error('Incorrect data: a field missing');
};
