import {  useState , useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Tasks from './Task'
import AddTask from './AddTask'


const Notepad = () => {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

// fetch Tasks 
const fetchTasks = async() => {
  const res = await fetch('http://localhost:3000/tasks')
  const data = await res.json()

  return data
}
// fetch Task 
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:3000/tasks/${id}`)
  const data = await res.json()

  return data
}

// Add Task
const addTask = async (task) => {

  const res = await fetch(`http://localhost:3000/tasks/`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()   // you need to await for promise


  setTasks([...tasks, data])

}


// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`,
   {
     method: 'DELETE'

  })

  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask= { ...taskToToggle,
  reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(updTask)

  })

  const data = await res.json()

  setTasks(
    tasks.map((task) => 
      task.id === id ? { ...task, reminder: 
      data.reminder} : task
      )
    )
  }

  return (
    <Router>
    <div className='container'>
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask} 
      />
    
      <Route 
       path='/feed' 
       exact 
       render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (
            <Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder}
            /> 
          ): (
            'No tasks to show'
          )}
        </>
      )} 
      />

    </div>
    </Router>
  )
}

export default Notepad;
