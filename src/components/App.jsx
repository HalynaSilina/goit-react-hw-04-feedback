import React, { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import css from './App.module.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleAddFeedback = ({ target: { name } }) => {
    if (name === 'good') setGood(state => state + 1);
    if (name === 'neutral') setNeutral(state => state + 1);
    if (name === 'bad') setBad(state => state + 1);
  };
  
  const countPositiveFeedbackPercentage = total => {
    return Math.round((good / total) * 100);
  };

  const countedTotalFeedback = good + neutral + bad;
  const positiveFeedback =
  countPositiveFeedbackPercentage(countedTotalFeedback);

  return (
    <div className={css.container}>
      <Section title={'Please, leave feedback'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleAddFeedback}
        />
      </Section>
      {countedTotalFeedback !== 0 ? (
        <Section title={'Statistics'}>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countedTotalFeedback}
            positivePercentage={positiveFeedback}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};

export default App;
