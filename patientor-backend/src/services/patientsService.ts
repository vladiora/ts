import { PatientWOSsn } from "../types";
import patients from "../data/patients";

const getPatientsWOSsn = (): PatientWOSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name,dateOfBirth, gender, occupation
    }));
}

export default { getPatientsWOSsn };
