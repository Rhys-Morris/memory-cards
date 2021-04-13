import React from "react";

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingText: "Loading",
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.loadingText === "Loading...") {
        this.setState({
          loadingText: "Loading",
        });
      } else {
        this.setState((state) => ({
          loadingText: state.loadingText + ".",
        }));
      }
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { loadingText } = this.state;
    return (
      <div className="loading">
        <h3 className="loading__text">{loadingText}</h3>
        <img
          className="loading__image"
          src="https://www.pinclipart.com/picdir/big/366-3668322_pokmon-pokball-pokeball-png-clipart.png"
        />
      </div>
    );
  }
}
