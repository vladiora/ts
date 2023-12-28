import { PatientEntry, PatientWOSsn } from "../types";
import patientEntries from "../data/patients";
import { v1 as uuid } from 'uuid';

const getPatientsWOSsn = (): PatientWOSsn[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id, name,dateOfBirth, gender, occupation, entries
    }));
};

const getpatientWOSsn = (id: string): PatientWOSsn => {
    return patientEntries.filter(patient => patient.id === id)[0];
};

const addPatient = (patient: Omit<PatientEntry, 'id'>): PatientEntry => {

    const newPatient = {id: uuid(), ...patient};

    return newPatient;
};

export default { getPatientsWOSsn, getpatientWOSsn, addPatient };
