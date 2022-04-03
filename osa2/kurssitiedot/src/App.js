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
    let sum = 0;

    props.parts.forEach((element) => {
        sum += element.exercises;
    });

    return (
        <p>
            <b>total of {sum} exercises</b>
        </p>
    );
};

/**
 * renders course objects
 * @param {*} course - object
 * @returns
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
    const course = {
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
    };

    return (
        <div>
            <Course course={course}></Course>
        </div>
    );
};

export default App;