import React from "react";

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingText: "Catching Pokemon",
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.loadingText === "Catching Pokemon...") {
        this.setState({
          loadingText: "Catching Pokemon",
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
      </div>
    );
  }
}
