import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'

class AddTask extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            taskDesc: ''
        };
    }
    
    handleTaskTextChange(e){
        this.setState({
            taskDesc: e.target.value
        })
    }

    handleAddTaskClick(){
        this.props.handlerToCollectTaskInfo(this.state.taskDesc);
        this.setState({
            taskDesc: ''
        });
    }

    render(){
        return (
            <div> 
                <form>
                    <input type="text" value={this.state.taskDesc} onChange={(e) => this.handleTaskTextChange(e)} />
                    <input type="button" value="Add Task" onClick={() => this.handleAddTaskClick()}/>
                </form>
            </div>
            
        )

    }
}

class TaskList extends React.Component{

    constructor(props){
        super(props);
    }

    handleTaskClick(task){
        
        this.props.HandlerToCollectTastClickInfo(task);
        
    }

    render(){

        let list = [];

        for(let i = 0; i < this.props.tasks.length ; i++ ){

            let task = this.props.tasks[i];
            let flag = this.props.purpose == "Task to do" ? "Do" : "Undo";

            let li = (
                <div key = {i} > 
                    <span> {task.desc} </span>
                    <input type="button" value={flag} onClick={() => this.handleTaskClick(task)}/>

                </div>
            );
            list.push(li);
        }

        return (
            <>
                <div className={this.props.forStyling} > 
                    <div className='list-container'>
                        <div className='title'> {this.props.purpose} </div>
                        <div className='content'>
                            {list}
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tasks : [
                {
                    desc : 'Switch off light',
                    isFinished : false
                },{
                    desc : 'Turn on fan',
                    isFinished : true
                },{
                    desc : 'Make Tea',
                    isFinished : false
                },{
                    desc : 'Make Dinner',
                    isFinished : true
                } 
            ]
        }
    }

    handleNewTask(task){
        if( task == '') return;
        let oldTasks = this.state.tasks.slice();
        oldTasks.push({
            desc : task,
            isFinished : false
        });
        this.setState({
            tasks : oldTasks
        })
    }

    handleTaskStatusUpdate(task, newStatus){
        let oldTasks = this.state.tasks.slice();
        let taskItem = oldTasks.find( ot  => ot.desc == task.desc );

        alert(taskItem.desc);
        console.log(taskItem.desc);

        taskItem.isFinished = newStatus;
        this.setState({
            tasks : oldTasks
        })

    }


    render(){

        let tasks = this.state.tasks;

        let todo = tasks.filter( t => t.isFinished == false);
        let finished = tasks.filter( t=> t.isFinished == true );

        return (
            <>
                <div className='add-task'>
                    <AddTask handlerToCollectTaskInfo={(desc) => this.handleNewTask(desc)} />
                </div>
                <div className='task-lists'>
                    <TaskList HandlerToCollectTastClickInfo={(task) => this.handleTaskStatusUpdate(task, true) } tasks={todo} purpose="Task to do" forStyling="todo" />
                    <TaskList HandlerToCollectTastClickInfo={(task) => this.handleTaskStatusUpdate(task, false) } tasks={finished} purpose="Finished Task" forStyling="finished" />
                </div>
            </> 
        );
    }
}


ReactDOM.render( <App/>, document.getElementById("root") );

