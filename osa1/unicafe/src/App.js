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
 * @example <FeedbackButton text={"somebutton"} click={() => doStuff()}></FeedbackButton>
 * @returns react component
 */
const FeedbackButton = ({text, click}) => {
  return(
    <button onClick={click}>{text}</button>
  );
}

/**
 * Show text in paragraph.
 * @param {*} text Text to show.
 * @returns react component
 */
const Stat = ({text}) => {
  return(
    <p>{text}</p>
  );
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headlines = {main: "give feedback", secondary: "statistics"};


  return (
    <div>
      <Header headline={headlines.main} headerSize={1}></Header>

      <FeedbackButton text={"good"} click={() => setGood(good + 1)}></FeedbackButton>
      <FeedbackButton text={"neutral"} click={() => setNeutral(neutral + 1)}></FeedbackButton>
      <FeedbackButton text={"bad"} click={() => setBad(bad + 1)}></FeedbackButton>
      
      <Header headline={headlines.secondary} headerSize={2}></Header>
      <Stat text={`good ${good}`}></Stat>
      <Stat text={`neutral ${neutral}`}></Stat>
      <Stat text={`bad ${bad}`}></Stat>
    </div>
  )
}

export default App