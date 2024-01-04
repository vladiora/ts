import { Entry, EntryWithoutId, PatientEntry, PatientWOSsn } from "../types";
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
    patientEntries.push(newPatient);

    return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {

    const newEntry = {id: uuid(), ...entry};
    patientEntries.forEach(patient => {
        if (patient.id === patientId) {
            patient.entries.push(newEntry)
        }
    });

    return newEntry;
};

export default { getPatientsWOSsn, getpatientWOSsn, addPatient, addEntry };
