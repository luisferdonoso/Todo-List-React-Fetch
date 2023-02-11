import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks,setTasks]= useState([])
	const [newTask,setNewTask] = useState("")
	const api = "https://assets.breatheco.de/apis/fake/todos/user/luisferdonoso"
	function addTask (e){
		if(e.code=="Enter" && newTask!=""){
			setTasks([...tasks,{label: newTask, done: false}])
			setNewTask("")
		}
	}

	function checkTask(index) {
		//Actualiza check
		var newTasks = [...tasks]
		newTasks[index] = {...newTasks[index], done:!newTasks[index].done}
		setTasks(newTasks)
	}
	
	useEffect (async() =>{
		var respuesta =await fetch (api)
		if (respuesta.status == 404) {
			respuesta =await fetch (api,{
				method:"POST",
				body:JSON.stringify([]),
				headers:{
					"Content-Type":"application/json"
				}
			})
			respuesta =await fetch (api)

		} else if (!respuesta.ok){
				console.log("Erros al cargar la lista:" + respuesta.statusText)
		} var data =await respuesta.json()
		setTasks(data)
	},[])
	
	const [deleteTask, setDeleteTask] = useState("")
		
	async function removeTask(index){
		console.log(index)
		var newTasks = [...tasks]
		newTasks.splice(index, 1)
		setTasks(newTasks)
	}
	async function clearList(){
		var clearlist = []
		setTasks(clearlist)
		let respdelete = await  fetch(api,{
			method:"DELETE",
			headers:{
				"Content-Type":"application/json"
			}
		})
		var respuesta = await fetch(api,{
				method:"POST",
				body:JSON.stringify([]),
				headers:{
					"Content-Type":"application/json"
				}
			})

			respuesta = await fetch(api)
	
			console.log("List Deleted")

	}


	return (
		<div className="container-fluid d-flex mt-5 justify-content-center">
			<ul className="list-group">
			<li className="list-group-item d-flex justify-content-between align-items-center">
				<input className="form-control" type="text" onKeyDown={e=>addTask(e)} onChange={e=>setNewTask(e.target.value)} value={newTask} name="task" id="task" />
				<button className="input-group-text" onClick={()=>clearList()}>Clear All</button>
			</li>
				{tasks.map((task, index)=>(
				<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
					{task.label}	
					<span className="badge bg-danger  rounded-pill" onClick={() => removeTask(index)}>X</span>
				</li>
				))}
					<li className="list-group-item text-center disabled text-muted d-flex justify-content-center align-items-center">
						<small>{tasks.length} items</small>
					</li>
			</ul>
		</div>
	);
};

export default Home;
