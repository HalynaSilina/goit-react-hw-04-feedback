import React, { Component } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import css from './App.module.css';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleAddFeedback = evt => {
    const name = evt.target.name;
    this.setState(prevState => ({
      [name]: prevState[name] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const totalCount = good + neutral + bad;
    return totalCount;
  };
  countPositiveFeedbackPercentage = total => {
    const { good } = this.state;
    return Math.round((good / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const buttonOptions = Object.keys(this.state);
    const countedTotalFeedback = this.countTotalFeedback();
    const positiveFeedback =
      this.countPositiveFeedbackPercentage(countedTotalFeedback);
    return (
      <div className={css.container}>
        <Section title={'Please, leave feedback'}>
          <FeedbackOptions
            options={buttonOptions}
            onLeaveFeedback={this.handleAddFeedback}
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
  }
}

export default App;
