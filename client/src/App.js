import React from 'react';
import axios from 'axios';
import './App.css';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            CompList:[],
            partList:[],
            text:''
        };
    }
    handleSubmit(e){
        e.preventDefault();
         var data={item:this.state.text};
        axios.get("/testAPI/"+data.item,data)
        .then(res => {
            if (res.data) {
                this.setState({CompList: res.data.complete});
                this.setState({partList: res.data.partial});
            }
            console.log(res.data);
        });   
    }
render(){
  return (
    <div className="App">
        <h1>ReactAPP TESTING</h1>
      <form role="search" onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="text" 
                 value={this.state.text}
                 name="item"
                 onChange={(e)=>this.setState({text:e.target.value})}>
          </input>
          <button type="submit">Apply</button>
      </form>
   <ul>
     <h2>Complete match:  ({this.state.CompList.length} Items fetched)</h2>
         {this.state.CompList.map(Item=> <li>{Item.Keyword}</li>) }
        <h2>Partial match:   ({this.state.partList.length} Items fetched)</h2>
          {this.state.partList.map(Item=> <li>{Item.Keyword}</li>) }
   </ul>
    </div>
  );
}
}
export default App;
//historic-big-bend-02607