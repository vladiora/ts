import { NewDiaryEntry, Visibility, Weather } from "../types";
import './diaryForm.css';

interface DiaryFormProps {
    newDiaryEntry: NewDiaryEntry;
    addNewDiaryEntry: (event: React.SyntheticEvent) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const DiaryForm = (props: DiaryFormProps): JSX.Element => {
    return (
        <form className="my-form" onSubmit={props.addNewDiaryEntry}>

			<div className="form-group">
				<label>Date:</label>
				<input
				type="date"
				name="date"
				value={props.newDiaryEntry.date}
				onChange={props.handleChange}
				/>
			</div>

			<div className="form-group">
                <label>Visibility:</label>
                <div className="radio-group">
                    {Object.values(Visibility).map((visibility) => (
                        <label key={visibility} className="radio-label">
                        <input
                            type="radio"
                            name="visibility"
                            value={visibility}
                            checked={props.newDiaryEntry.visibility === visibility}
                            onChange={props.handleChange}
                        />
                        {visibility}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Weather:</label>
                <div className="radio-group">
                {Object.values(Weather).map((weather) => (
                    <label key={weather} className="radio-label">
                    <input
                        type="radio"
                        name="weather"
                        value={weather}
                        checked={props.newDiaryEntry.weather === weather}
                        onChange={props.handleChange}
                    />
                    {weather}
                    </label>
                ))}
                </div>
            </div>

			<div className="form-group">
				<label>Comment:</label>
				<input
				type="text"
				name="comment"
				value={props.newDiaryEntry.comment}
				onChange={props.handleChange}
				/>
			</div>

			<div className="form-group">
				<button type="submit">Submit</button>
			</div>

		</form>
    );
}

export default DiaryForm;