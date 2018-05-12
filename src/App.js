import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: 'fhfgh', name: 'Shigure Kousaka', age: 25 },
      { id: 'xacgw', name: 'Furinji Miu', age: 21 },
      { id: 'f1yteu12', name: 'Ma Renka', age: 21 },
    ],
    otherState: 'some other state!',
    showPersons: false,
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;
  
    this.setState({
      persons: persons 
    });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); or use spread like below
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
  
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const styles = {
      backgroundColor: 'green',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      transition: 'all .3s ease-in-out',
    };

    let persons;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
          return <Person 
            click={() => this.deletePersonHandler(index)}
            changed={(e) => this.nameChangedHandler(e, person.id)}
            name={person.name} 
            age={person.age}
            key={person.id}
            />
        })}
        </div> 
      );

      styles.backgroundColor = 'red';
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>

        <button
          style={styles}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>

        {persons}

      </div>
    );

    // return React.createElement(
    //   'div', 
    //   {className: 'App'}, 
    //   React.createElement(
    //     'h1', 
    //     'Hi, I\'m  a React App'
    //   ),
    //   React.createElement(
    //     'p', 
    //     'This is really working!'
    //   ),
    // });
  }
}

export default App;
