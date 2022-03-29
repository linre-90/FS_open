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
 * 
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
 * @returns react component
 */
const StatisticLine = ({text}) => {
  return(
    <p>{text}</p>
  );
}


/**
 * Displays and calculates statistics.
* @param {*} values array of StatObject objects. Duplicate names causes react key error!
 */
const Statistics = ({values}) => {
  const countAvereage = () => {
    //negative labeled values * -1 + positive labeled values / sum of totals
    return(
      (
        values.filter(element => element.value === -1).reduce((sum, element) => sum + element.total, 0) * -1 
        +  
        values.filter(element => element.value === 1).reduce((sum, element) => sum + element.total, 0)
      ) 
      / 
      values.reduce((sum, element) => sum + element.total, 0)
      );
  }

  const countGoodPercentage = () => {
    //positive total / all totals * 100 + "%"
    return (
      values.filter(element => element.value === 1).reduce((sum, element) => sum + element.total, 0) 
      / 
      values.reduce((sum, element) => sum + element.total, 0) * 100 + " %"
    );
  }

  // build statistic array
  let statistics = [
    ...values,
    new StatObject("all", values.reduce((sum, element) => sum + element.total, 0)),
    new StatObject("average", countAvereage()),
    new StatObject("positive", countGoodPercentage())
  ];

  return(
    <>
      {
        values.reduce((sum, element) => sum + element.total, 0) > 0 ? // if (sum(totals) is > 0) we have something to show...
        statistics.map(element => <StatisticLine key={element.name} text={`${element.name} ${element.total}`}/>)
        :
        <StatisticLine key="nofeedback" text="no feedback given"/>
      }
    </>
  );
}


/**
 * Statistic object prototype
 * @param {*} text name of the prototype
 * @param {*} total how many occurances
 * @param {*} value value of the prototype is it neutral(0) positive(1) or negative(-1)
 */
function StatObject (text, total, value){
  this.name = text;
  this.total = total;
  this.value = value;
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headlines = {main: "give feedback", secondary: "statistics"};

  return (
    <div>
      <Header headline={headlines.main} headerSize={1}></Header>

      <Button text={"good"} click={() => setGood(good + 1)}></Button>
      <Button text={"neutral"} click={() => setNeutral(neutral + 1)}></Button>
      <Button text={"bad"} click={() => setBad(bad + 1)}></Button>
      
      <Header headline={headlines.secondary} headerSize={2}></Header>

      <Statistics 
        values={[
          new StatObject("good", good, 1), 
          new StatObject("neutral", neutral, 0), 
          new StatObject("bad", bad, -1),
        ]} />
      
    </div>
  )
}

export default App