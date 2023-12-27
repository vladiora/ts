import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then(resp => resp.data);
}

export const addNewDiary = (diary: NewDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, diary).then(resp => resp.data);
}
