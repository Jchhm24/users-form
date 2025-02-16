import { ListUsers } from './components/ListUsers'
import {UserForm} from './components/UserForm'
import {UserListContext} from './context/UserListContext'

function App() {

  return (
    <UserListContext>
      <UserForm />
      <ListUsers />
    </UserListContext>
  )
}

export default App
