import { DiagnosisEntry } from "../types";
import diagnosesEntries from "../data/diagnoses";

const getEntries = (): DiagnosisEntry[] => {
    return diagnosesEntries;
};

export default { getEntries };