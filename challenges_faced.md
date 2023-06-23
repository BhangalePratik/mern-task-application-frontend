### How to call API in react application without calling them in loop?

#### Scenario

In TaskListAndButton, I want to display the task which are already created by the user and present in the database. I am using get request to get the data. I am calling this data and changing the state of the Tasks. Since, the task is getting update, the whole component is getting re rendered again and the api is called again as we are storing it directly.

#### Solution

To use useEffect.

### State management in multiple files. This is bad practise and hard to maintain for bigger project

#### Solution

Use Redux

### Redux is too complicated. How did you tackle it?

#### Solution

Use Redux toolkit. Instead of using createStore, I used configureStore to manage all the reducers. This reducers are created using createSlice. CreateSlice is easy to create.

### How to avoid bad coding practices?

#### Solution

Enforce Coding Style
