import { DiagnoseEntry } from "../types";
import diagnosesEntries from "../data/diagnoses";

const getEntries = (): DiagnoseEntry[] => {
    return diagnosesEntries;
}

export default { getEntries };