interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({coursePart}: {coursePart: CoursePart}): JSX.Element => {

  const italic = {fontStyle: 'italic'};


  switch (coursePart.kind) {
    case "basic":
      return <div>
              <b>{coursePart.name} {coursePart.exerciseCount}</b>
              <div style={italic}>{coursePart.description}</div>
              <br></br>
            </div>;
    case "group":
      return <div>
              <b>{coursePart.name} {coursePart.exerciseCount}</b>
              <div>project exercises {coursePart.groupProjectCount}</div>
              <br></br>
            </div>;
    case "background":
      return <div>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <div style={italic}>{coursePart.description}</div>
                <div>submit to {coursePart.backgroundMaterial}</div>
                <br></br>
              </div>;
    case "special":
      return <div>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <div style={italic}>{coursePart.description}</div>
                <div>required skills: {coursePart.requirements.join(', ')}</div>
                <br></br>
              </div>;
    default:
      return assertNever(coursePart);

  }

}

const Content = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {
  return <div>{courseParts.map(part => <Part key={part.name} coursePart={part} />)}</div>;
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
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
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
