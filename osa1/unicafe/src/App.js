import { useState } from 'react'

/**
 * Generic headline with customizable header size to please lighthouse accessibly moaning...
 * @param {*} headline Text to show inside element
 * @param {*} headerSize h tag size,  [1...6]
 * @returns react component
 */
const Header = ({headline, headerSize}) => {
  const Tag = `h${headerSize}`;
  return(
    <Tag>{headline}</Tag>
  );
}

/**
 * Renders buttons
 * @param {*} text Text to show on button. 
 * @param {*} click function to perform when clicked.
 * @example <Button text={"somebutton"} click={() => doStuff()}></Button>
 * @returns react component
 */
const Button = ({text, click}) => {
  return(
    <button onClick={click}>{text}</button>
  );
}

/**
 * Renders single statistic line.
 * @param {*} text Text to show.
 * @param {*} value Value to display.
 * @returns react component
 */
const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

/**
 * Displays statistics.
* @param {*} stats Array of objects. { name: "example", data: 0 }
 */
const Statistics = ({stats}) => {
  return(
      <table>
        <tbody>
          {stats.map(element => <StatisticLine key={element.name} text={element.name} value={element.data}/>)}  
        </tbody>
      </table>    
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headlines = {main: "give feedback", secondary: "statistics"};

  // had to refactor and i guess assignment said that all the data should be held here...
  const allData = good + neutral + bad;
  const averageData = ((good + bad * -1) / allData).toFixed(1);
  const positivePercentage = ((good / allData) * 100).toFixed(1) + " %";

  // compile list of objects to pass down to component tree
  const statistics = [
    { name: "good", data: good }, 
    { name: "neutral", data: neutral }, 
    { name: "bad", data: bad },
    { name: "all", data: allData },
    { name: "average", data: averageData },
    { name: "positive", data: positivePercentage }
  ]

  return (
    <div>
      <Header headline={headlines.main} headerSize={1}></Header>

      <Button text={"good"} click={() => setGood(good + 1)}></Button>
      <Button text={"neutral"} click={() => setNeutral(neutral + 1)}></Button>
      <Button text={"bad"} click={() => setBad(bad + 1)}></Button>
      
      <Header headline={headlines.secondary} headerSize={2}></Header>
      { allData > 0 ? <Statistics stats={statistics} /> : <Header headline={"no feedback given"} headerSize={3}></Header> }
    </div>
  )
}

export default App