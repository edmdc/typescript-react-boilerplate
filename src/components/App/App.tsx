import React, { Component } from "react";
import IdeaForm from "../IdeaForm/IdeaForm";

export type Idea = {
  id?: number;
  title: string;
  content: string;
}

type Ideas = Idea[];

class App extends Component {
  state: {
    cards: Ideas;
  }

  constructor(props) {
    super(props);
    console.log(props, "where am I?")
    this.state = {
      cards: [
        {
          title: "Awesome Music Sharing App",
          content: "What if we desinged an app to share music",
        },
        {
          title: "Tasty new recipe",
          content: "What if we mix pinaaple and jalapenos on pizza",
        },
      ],
    };
  }

  renderCards = (): JSX.Element[] => {
    return this.state.cards.map((card: Idea) => {
      return (
        <article key={card.id}>
          <h4>{card.title}</h4>
          <p>{card.content}</p>
        </article>
      );
    });
  };

  submitNewIdea = (newIdea: Idea): void => {
    this.setState({cards: [...this.state.cards, newIdea]})
  }

  render(): JSX.Element {
    return (
      <section>
        <h1>IdeaBox</h1>
        <IdeaForm submitIdea={this.submitNewIdea}/>
        {this.renderCards()}
      </section>
    );
  }
}

export default App;

