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

### Can I pass array of task to frontend in API? IF no, then how can I pass it through backend?

#### Solution

NO, You can pass object or string. So, you want to pass the array, stringify it then pass it. Express internally stringify it when you pass the object or array. So even though, you passed, it will be passed as json string.

### Frontend testing is hard. If I test the tree then it will miss CSS

#### Solution

Use visual regression testing