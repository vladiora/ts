import { PatientEntry, PatientWOSsn } from "../types";
import patientEntries from "../data/patients";
import { v1 as uuid } from 'uuid';

const getPatientsWOSsn = (): PatientWOSsn[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name,dateOfBirth, gender, occupation
    }));
}

const addPatient = (patient: Omit<PatientEntry, 'id'>): PatientEntry => {

    const newPatient = {id: uuid(), ...patient};

    return newPatient;
}

export default { getPatientsWOSsn, addPatient };
