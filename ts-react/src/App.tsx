interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>;
};

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {
  return <div>{courseParts.map(prop => <p key={prop.name}>{prop.name} {prop.exerciseCount}</p>)}</div>;
}

interface TotalProps {
  totalCount: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return <p>Number of exercises {props.totalCount}</p>;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalCount={totalExercises} />
    </div>
  );
};

export default App;
