import React, {Component} from 'react';
import checkAll from './img/checkAll.svg';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component{
  constructor() {
    super();
    this.state = {
      newItem: "",
      currentItem: 'all',
      todoItems: [
        { title: 'Đi học', isComplete: true },
        { title: 'Đi làm', isComplete: false },
        { title: 'Đi chơi', isComplete: true }
      ]
    }
    
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAllSelected = this.onAllSelected.bind(this);
    this.onAllItemClicked = this.onAllItemClicked.bind(this);
    this.onActiveItemClicked = this.onActiveItemClicked.bind(this);
    this.onCompleteItemClicked = this.onCompleteItemClicked.bind(this);
    this.onClearCompleteClicked = this.onClearCompleteClicked.bind(this);
  }

  // event click item use to check item
  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    }
    console.log(item);
  }

  // event onKeyUp use to fetch value user enter
  onKeyUp(event) {
    if(event.keyCode === 13) {    // keyCode = 13 : Enter
      let text = event.target.value;
      if(!text) {
        return;
      }
      // delete backspace in start and end
      text = text.trim();
      if(!text) {
        return;
      }

      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }
  
  // click delete item
  // onItemDeleted(item) {
  //   return (event) => {
  //     const { todoItems } = this.state;
  //     const index = todoItems.indexOf(item);
  //     this.setState({
  //       todoItems: [
  //         ...todoItems.slice(0, index),
  //         ...todoItems.slice(index + 1)
  //       ]
  //     })
  //   }
  // }

  // click item select all
  onAllSelected() {
    this.setState({
      todoItems: this.state.todoItems.map((item) => {
        item.isComplete = true;
        return item;
      })
    })
  }

  // click all
  onAllItemClicked() {
    this.setState({
      currentItem: 'all'
    });
  }
  // click active
  onActiveItemClicked() {
    this.setState({
      currentItem: 'active'
    })
  }
  // click complete
  onCompleteItemClicked() {
    this.setState({
      currentItem: 'complete'
    })
  }

  // clearC complete click
  onClearCompleteClicked() {
    this.setState({
      todoItems: this.state.todoItems.filter((item) => {
        return item.isComplete === false;
      })
    });
  }
  
  render() {
    let { todoItems, newItem, currentItem } = this.state;
    // filter todoItems
    if(currentItem === 'active') {
      todoItems = todoItems.filter((item) => {
        return item.isComplete === false;
      });
    }
    if(currentItem === 'complete') {
      todoItems = todoItems.filter((item) => {
        return item.isComplete === true;
      });
    }
    // count Items
    const leng = todoItems.length;
    const url = checkAll;
    const lengComplete = todoItems.filter((item) => {
      return item.isComplete === true;
    }).length;

    return (  // react element
      <div className="App">
        <div className="Header">
          <img src={url} onClick={this.onAllSelected} width="32" height="32" />
          <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newItem}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}/>
        </div>
        {todoItems.length > 0 && todoItems.map((item, index) => (
          <TodoItem 
          key={index} 
          item={item} 
          onClick={ this.onItemClicked(item) } />
          ))}
        {todoItems.length === 0 && 'nothing here'}
        <div className="Footer">
            <p>
              {leng} Items
            </p>
            <div className="clickItem">
              <a key="all" href="#" onClick={ this.onAllItemClicked } >All</a>
              <a key="active" href="#" onClick={ this.onActiveItemClicked } >Active</a>
              <a key="complete" href="#" onClick={ this.onCompleteItemClicked } >Complete</a>
            </div>
            { lengComplete > 0 && <a key="clear" href="#" onClick={ this.onClearCompleteClicked } >Clear Complete</a> }
        </div>
      </div>
    );
  }
 
}

export default App;
