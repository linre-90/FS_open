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

export default Course;
