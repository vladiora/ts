import { useEffect, useState } from 'react'
import './App.css'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import DiaryForm from './components/diaryForm';
import { addNewDiary, getAllDiaries } from './services/diaryService';
import axios from 'axios';

const Notification = ({error}: {error: string}): JSX.Element => {
	if (!error)
		return <div></div>;

	return <div className='error'>{error}</div>
}

function App() {

	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
		date: '',
		visibility: Visibility.Ok,
		weather: Weather.Sunny,
		comment: '',
	});
	const [error, setError] = useState('');

	useEffect(() => {
		getAllDiaries().then(data => setDiaries(data));
	}, [])

	const italic = {fontStyle: 'italic'};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

		const { name, value } = event.target;

		setNewDiaryEntry((prevValues) => ({
		...prevValues,
		[name]: value,
		}));
	};

	const addNewDiaryEntry = (event: React.SyntheticEvent) => {
		event.preventDefault();

		addNewDiary(newDiaryEntry).then(data => setDiaries(diaries.concat(data))).catch(error => {
			if (axios.isAxiosError(error)) {

				setError(error.response?.data);

				setTimeout(()=> {
					setError('');
				}, 3000);
			} else {
				console.error(error);
			}
		});
		setNewDiaryEntry({
			date: '',
			visibility: Visibility.Ok,
			weather: Weather.Sunny,
			comment: '',
		});
	}

  	return (
		<div>
			<Notification error={error} />
			<DiaryForm newDiaryEntry={newDiaryEntry} addNewDiaryEntry={addNewDiaryEntry} handleChange={handleChange} />

			<h1>Diary entries</h1>
			{diaries.map(diary =>
				<div key={diary.id}>
				<h3>{diary.date}</h3>
				visibility: {diary.visibility}
				<br></br>
				weather: {diary.weather}
				<br></br>
				<div style={italic}>{diary.comment}</div>
				</div>
			)}
		</div>
	)
}

export default App
