import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks,setTasks]= useState([

	])
	const [newTask,setNewTask] = useState("")
	function addTask (e){
		if(e.code=="Enter" && newTask!=""){
			setTasks([...tasks,{label: newTask, done: falso}])
			setNewTask("")
		}
	}
	useEffect (async() =>{
		var respuesta =await fetch ("https://assets.breatheco.de/apis/fake/todos/user/luisferdonoso")
		if (respuesta.status == 404) {
			respuesta =await fetch ("https://assets.breatheco.de/apis/fake/todos/user/luisferdonoso",{
				method:"POST",
				body:JSON.stringify([]),
				headers:{
					"Content-Type":"application/json"
				}
			})
			respuesta =await fetch ("https://assets.breatheco.de/apis/fake/todos/user/luisferdonoso")

		} else if (!respuesta.ok){
				console.log("Erros al cargar la lista:" + respuesta.statusText)
		} var data =await respuesta.json()
		setTasks(data)
	},[])
	
	function removeTask(index){
		setTasks(tasks.filter((task, i) => i !== index))
	}

	return (
		<div className="container-fluid d-flex mt-5 justify-content-center">
			<ul className="list-group">
			<li className="list-group-item d-flex justify-content-between align-items-center">
				<input className="form-control" type="text" onKeyDown={e=>addTask(e)} onChange={e=>setNewTask(e.target.value)} value={newTask} name="task" id="task" />
			</li>
				{tasks.map((task, index)=>(
				<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
					{task.label}	
					<span className="badge bg-danger rounded-pill" onClick={() => removeTask(index)}>X</span>
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
