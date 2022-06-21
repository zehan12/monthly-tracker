import React from "react";
import { TiDelete } from "react-icons/ti";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activity: "",
      Acitivities: [],
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.Acitivities;
    arr.push(this.state.activity)
    this.setState({ Acitivities: arr });
  }

  handleActivity = ({ target }) => {
    let { name, value } = target
    this.setState({ [name]: value });
    target.innerText = ""
  }

  handelEvents = ( index ) => {
    let arr = this.state.Acitivities
    arr.splice(arr.indexOf(index),1)
    this.setState({ Acitivities: arr })
  }


  componentDidMount(){
    if ( localStorage.Acitivities ) {
      this.setState( { Acitivities: JSON.parse(localStorage.Acitivities)|| [] }  );
    }
    window.addEventListener("beforeunload",this.handleLocalStorage)
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload",this.handleLocalStorage)
  }

  handleLocalStorage = () => {
    window.localStorage.setItem( "Acitivities", JSON.stringify(this.state.Acitivities) )
  }

  render() {
    
    return (
      <div className="text-center">
        <h1 className="text-3xl text-sky-600">Monthly Activity Tracker!</h1>
        <form onSubmit={this.handleSubmit} >
          <input onChange={this.handleActivity} className="border py-2 pl-12" type="text" id="fname" name="activity" value={this.state.activity} placeholder="e.g. coding" />
          <input className="text-white py-2 px-3 bg-teal-500" type="submit" value="Add Activity" />
        </form>
        <div className="m-20 text-center">
          { 
            this.state.Acitivities.map((ele,i)=><AcitivityCard key={ele} name={ele} handelEvents={ this.handelEvents } key={ele} label={ele} />)
          }
        </div>
      </div>

    );
  }
}


class AcitivityCard extends React.Component {
  constructor ( props ) {
    super( props )
    this.state = {
      selected: []
    }
  }
    handelDate = ( date ) => {
    if ( this.state.selected.includes(date) ) {
      this.setState( prevState => ( { selected: prevState.selected.filter(d => d !== date) } ) )
    } else {
    this.setState( prevState => ( { selected: prevState.selected.concat( date ) } ) )
    }
    console.log(this.state.selected)
  }
  render(){
    let selected = this.state.selected
  return <div className="border rounded m-2 flex">
    <div className="p-24 m-2 bg-purple-300">
      <h2 className="text-lg m-1 font-semibold">{this.props.label}</h2>
      <h3 className="bg-red-500 px-2 text-white p-1 rounded text-lg font-semibold">
        {
          new Date().toLocaleString('en-US', { month: 'long' })
        }
      </h3>
    </div>
    <div className="p-3 m-2 flex flex-wrap ">
      {
        Array.from({ length: Number(String((new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0))).split(" ")[2]) }, (_, i) => i + 1).map((ele) =>
          <button onClick={ ()=>{ this.handelDate(ele) } }
           className={`border h-10 w-20 m-2 ${ selected.includes(ele) ? "bg-green-200" : "" }`}>{ele}</button>)
      }
    </div>
    <div>
      <TiDelete onClick={() => { this.props.handelEvents(this.props.name) }} className=" mt-1 mr-2 text-red-500 text-3xl" />
    </div>
  </div>
  }
}

export default App;
