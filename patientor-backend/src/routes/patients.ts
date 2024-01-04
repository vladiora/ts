import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatientsWOSsn());
});

router.get('/:id', (req, res) => {
    res.send(patientsService.getpatientWOSsn(req.params.id));
});

router.post('/', (req, res) => {

   try {

        const newPatient = toNewPatient(req.body);
        const addedEntry = patientsService.addPatient(newPatient);
        res.json(addedEntry);

   } catch (error: unknown) {

        let errorMessage = 'Something went wrong.';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
   }
});

router.post('/:id/entries', (req, res) => {

    try {

        const newEntry = toNewEntry(req.body);
        const addedEntry = patientsService.addEntry(newEntry, req.params.id);
        res.json(addedEntry);

    } catch (error: unknown) {

        let errorMessage = 'Something went wrong.';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
   }
});

export default router;