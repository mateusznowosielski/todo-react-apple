# todo-react-apple

Inspired by Apple MacOS Reminders very simplified version of Todo list.

Becuase all todos have tons of unnecessary buttons.

<img width="648" alt="screen shot 2018-09-26 at 5 05 54 am" src="https://user-images.githubusercontent.com/42792726/46078937-7c2f1080-c14a-11e8-9b9f-9f999ee2cfbb.png">

### Installation

```
git clone https://github.com/mateusznowosielski/todo-react-apple.git
cd todo-react-apple
npm install
npm run start
```
Open `http://localhost:8080/` in a browser.

### Tests
```
npm run test
```
### Production build
```
npm run build
```

## Functionality
* adding todo: type in the first field and hit enter or focus out from the field.
* remove todo: remove text from existing todo.
* update todo: simply edit text in todo text field.
* complete/uncomplete todo: click the circle checkbox.
* show completed: visible only when there are completed todos, click 'Show' to reveal completed todos.
* hide completed: click 'Hide' to view only uncompleted todos.
* reorder todos: drag and drop todo within a list.

### To be implemented
* sorting todos: completed on top 
* undo/redo: cmd+z / cmd+shift+z
