import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatientsWOSsn());
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

export default router;