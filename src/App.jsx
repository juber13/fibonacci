import { useState , useEffect } from 'react'
import './App.css'

function App() {
  const [data , setData] = useState([])
  const [inputValue , setInputValue] = useState({})

  const fetchData = async() => {
     try{
     const res = await fetch("https://run.mocky.io/v3/7de65235-2269-4803-b7e2-34d0d6ccfe27");
     const data = await res.json();
     setData(data)
     }catch(err){
      console.log(err)
     }
  }

  useEffect(() => {
      fetchData();
  },[])

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    const {name , value} = e.target;
    setInputValue({...inputValue , [name] : value , id : data.length + 1});

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data , inputValue]);


  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="firstName" type="text" placeholder="name"/>
        <input onChange={handleChange} name="lastName" type="text" placeholder="lastName"/>
        <input onChange={handleChange} name="mobileNumber" type="text" placeholder="mobileNumber"/>
        <button type="submit">Add</button>  
      </form>
      <div>
        {
          data.map((item, index) => {
            return(
            <>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>
            <p>{item.mobileNumber}</p>
             <button onClick={() => handleDelete(item.id)}>Delete</button>
            </>
            )

          })
        }
      
      </div>  
    </>
  )
}

export default App
