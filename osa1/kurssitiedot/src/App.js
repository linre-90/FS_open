const Part = (props) => {
  return(
    <>
      <p>{props.description} {props.exercises}</p>
    </>
  )
}

const Header = (props) => {
  return(
    <h1>{props.name}</h1>
  );
}

const Content = (props) => {
  return(
    <>
      {
        props.parts.map((element) =>{
          return <Part key={element.name} description={element.name} exercises={element.exercises} />
        })
      }
    </>
  );
}

const Total = (props) => {
  let sum = 0;

  props.parts.forEach(element => {
    sum += element.exercises;
  });

  return(
    <p>Number of exercises {sum}</p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App