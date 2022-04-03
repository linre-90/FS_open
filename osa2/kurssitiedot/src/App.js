/**
 * How single course -> parts -> element is rendered
 * @param {*} props single part from course object
 * @returns
 */
const Part = (props) => {
    return (
        <>
            <p>
                {props.description} {props.exercises}
            </p>
        </>
    );
};

/**
 * renders course objects header
 * @param {*} props header to show
 * @returns
 */
const Header = (props) => {
    return <h1>{props.name}</h1>;
};

/**
 * Renders course objects parts
 * @param {*} parts single part in course object.
 * @returns
 */
const Content = ({ parts }) => {
    return (
        <>
            {parts.map((element) => {
                return (
                    <Part
                        key={element.id}
                        description={element.name}
                        exercises={element.exercises}
                    />
                );
            })}
        </>
    );
};

/**
 * Renders total number of exercices
 * @param {*} props
 * @returns
 */
const Total = (props) => {
    const total = props.parts.reduce(
        (sum, element) => element.exercises + sum,
        0
    );

    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    );
};

/**
 * renders single course object
 * @param {*} course - object
 * @returns single course react component
 */
const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3,
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div>
            {courses.map((course) => (
                <Course key={course.id} course={course}></Course>
            ))}
        </div>
    );
};

export default App;
