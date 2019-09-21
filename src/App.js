import React, {Component} from 'react';

import checkAll from './img/checkAll.svg';
import deleteInput from './img/delete.svg';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component{
  constructor() {
    super();
    const data = JSON.parse(localStorage.getItem('TodoItem'));
    this.state = {
      newItem: "",
      currentItem: 'all',
      todoItems: data
    }

    // localStorage.setItem('TodoItem', JSON.stringify(this.state.todoItems));
    
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAllSelected = this.onAllSelected.bind(this);
    this.onAllItemClicked = this.onAllItemClicked.bind(this);
    this.onActiveItemClicked = this.onActiveItemClicked.bind(this);
    this.onCompleteItemClicked = this.onCompleteItemClicked.bind(this);
    this.onClearCompleteClicked = this.onClearCompleteClicked.bind(this);
    this.onDeleteInputClicked = this.onDeleteInputClicked.bind(this);
    // create Ref()
    this.inputElement = React.createRef();
  }
  
  // component did mount
  componentDidMount() {
    // automactic focus input after go to website
    this.inputElement.current.focus();
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

  // click delete input
  onDeleteInputClicked(event) {
    this.setState({
      newItem: ''
    })
  }

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
    // update data to localStorage after render
    // localStorage.removeItem('todoItem');
    localStorage.setItem('TodoItem', JSON.stringify(todoItems));

    // filter todoItems if click active
    if(currentItem === 'active') {
      todoItems = todoItems.filter((item) => {
        return item.isComplete === false;
      });
    }

    // filter todoItems if click complete 
    if(currentItem === 'complete') {
      todoItems = todoItems.filter((item) => {
        return item.isComplete === true;
      });
    }
    // count Items
    const leng = todoItems.length;
    const url = checkAll;
    const urlDel = deleteInput;
    const lengComplete = todoItems.filter((item) => {
      return item.isComplete === true;
    }).length;

    return (  // react element
      <div className="App">
        <div className="Header">
          <img src={url} 
          onClick={this.onAllSelected} 
          width="32" 
          height="32"
          alt="select all" />
          <input 
          type="text" 
          ref={this.inputElement}
          placeholder="What needs to be done?" 
          value={newItem}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}/>
          { newItem && 
          <img 
          src={urlDel} 
          onClick={this.onDeleteInputClicked}  
          width="24"
          height="24"
          /> }
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
              <a key="all" 
              href="#" 
              onClick={ this.onAllItemClicked } >All</a>
              <a key="active" 
              href="#" 
              onClick={ this.onActiveItemClicked } >Active</a>
              <a key="complete" 
              href="#" 
              onClick={ this.onCompleteItemClicked } >Complete</a>
            </div>
            { 
              lengComplete > 0 
              && 
              <a key="clear" 
              href="#" 
              onClick={ this.onClearCompleteClicked } >Clear Complete</a> 
            }
        </div>
      </div>
    );
  }
 
}

export default App;
