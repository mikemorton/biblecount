import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, bindActionCreators, Dispatch } from 'redux';
import { Provider, connect } from 'react-redux';

import { rootReducer, AppState, TestStatus } from './thereducer';
import Actions = require('./actions');
import Constants = require('./constants');

const store = createStore(rootReducer, {});

class Header extends React.Component<{}, void>{
  render() {
    return <h1>Bible Reading Calculator</h1>
  }
}

class StatsSection extends React.Component<{secondsTaken:number}, void> {
  render() {
    const totalBibleSeconds = (Constants.totalBibleCount / Constants.textCount) * this.props.secondsTaken;
    const dailySeconds = totalBibleSeconds / 365;

    return <div>
      <p>You read {Constants.textCount} words in {this.props.secondsTaken.toFixed(2)} seconds.  The entire Bible is {Constants.totalBibleCount} words so you could read the entire Bible in {totalBibleSeconds.toFixed(0)} seconds.</p>
      <p>If you read the Bible for {dailySeconds.toFixed(0)} seconds each day you would finish the bible in a year.</p>
      <p>Comments? Feedback? Contact me on Twitter <a href="http://www.twitter.com/theycallmemorty">@theycallmemorty</a></p>
    </div>
  }
}

interface AppProps extends React.Props<void> {
  mainState?: AppState;
  dispatch?: Dispatch;
}
class App extends React.Component<AppProps, void> {
  render() {
    const { mainState, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);

    if(mainState.status == TestStatus.beforeStart) {
      return <div>
        <Header/>
        <p>Read a short passage to determine how long it would take for you to read the entire Bible.  Click Start when you're ready.</p>
        <button onClick={actions.startClicked} className="btn btn-default">Start</button>
      </div>
    }
    else {
      return <div>
        <Header />
        <p className={"lead"}>{Constants.textTitle}</p>
        {Constants.text.map((s) => <p>{s}</p>)}
        { mainState.status == TestStatus.started ? <button onClick={actions.doneClicked} className="btn btn-default">Done</button> : null }
        { mainState.status == TestStatus.finished ? <hr/> : null }
        { mainState.status == TestStatus.finished ? <StatsSection secondsTaken={mainState.secondsTaken}/> : null }
        { mainState.status == TestStatus.finished ? <button onClick={actions.resetClicked} className="btn btn-default">Reset</button> : null }
      </div>
    }
  }
}

var ConnectedApp =  connect((state:any) => (state))(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById('base')
);
