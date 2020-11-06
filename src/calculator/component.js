import React, { Component } from "react"

var numberToWords = require('number-to-words');


var inputs = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'

  // 'clear' :'clear'
}

var operators = {
  'add' : '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/',
}

class Input extends Component {
    constructor(props) {
      super(props)
      this.state = { id: "", operation: ""}
    }

    render() {
        return(
        <button id={this.props.id} onClick={this.props.handler}>{this.props.operation}</button>
        )
    }
}

class Calculator extends Component {
    constructor(props) {
      super(props)
      this.state = {
        x: "",
        data: [],
        display: "",
        res: 0
    }

      this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e) {

      let input = e.target.id


      console.log(inputs[input])

      switch(input)
      {
        case "equals":
          // console.log("Expression : " + this.state.data.join("") + this.state.x)
          let str = this.filterResult(this.state.data.concat(this.state.x)).join("").replace(/,/g, '')
          console.log(str)
          let res = eval(str) //this.computeResult()//
          let arr = [res]
          this.setState({
            display: res,
            data: arr,
            x: ""
          })
          
          break;
        case "clear":
          this.setState({
            x : "",
            data : [],
            display : "0"
          })  
          break;
        case "decimal":
          if(!this.state.x.includes("."))
          this.setState({
            x : this.state.x + ".",
            display : this.state.display + "."
          })  
          break;
        default:
            if(inputs[input]){//Digit
              this.handleDigit(input);
            } else {//Operator
              //console.log("HEEEERE")
              this.handleOperator(operators[input]);
            }
            break;
      }
    }

// If 2 or more operators are entered consecutively, the operation performed 
// should be the last operator entered (excluding the negative (-) sign.

filterResult(inpArr){ 
  // let inpArr = arr
  let tmpOprArr = []
  let simOprArr = []
  let resArr = []

  console.log(inpArr)

  for(let i = 0; i< inpArr.length; i++)
  {
    if(inpArr[i] === "")
    continue

    console.log("INPUT : " + " is :" + inpArr[i])
    // console.log("Is " + inpArr[i] + " a digit? :" + !isNaN(inpArr[i]))
    if(isNaN(inpArr[i]))//if it's a symbol, filter to a temporary array
    {
      tmpOprArr.push(inpArr[i])
      console.log("tmpPorArr updated to : " + tmpOprArr)
    } else //If a number is found, filter the opr array to remove the unwanted operators
    {
      console.log(inpArr[i] + " is a number")
      console.log("Operator kept : " + tmpOprArr.slice(-1))

      console.log("length : " + tmpOprArr.length)
      console.log("value : " + tmpOprArr.slice(-1))
    if(tmpOprArr.length > 1 && tmpOprArr.slice(-1) == "-")
      {//last operator is a negative
      resArr.push(tmpOprArr.slice(-2)) 
      console.log("passed here 1")
      tmpOprArr = []
      }
    else if (tmpOprArr.length > 1)
    {
      resArr.push(tmpOprArr.slice(-1))
      console.log("passed here 2" + tmpOprArr.slice(-1))
      tmpOprArr = []
    }
    else
    {
      resArr.push(tmpOprArr)
      tmpOprArr = []
      console.log("passed here 3")
    }

    resArr.push(inpArr[i])

    

      console.log("res array: " + resArr)
    }

    console.log("ResArray : " + resArr)
  }

  return resArr
}


setTest(){
      this.setState({
        data : ["5","*","-","+","5"]
      })
    }

    handleDigit(digit){
      
      if(this.state.display === "0"){
        this.setState({
          x : inputs[digit],
          display : inputs[digit]
        })  
      } else {
      this.setState({
        x : this.state.x + inputs[digit],
        display : this.state.display + inputs[digit]
      })  
    }
    }

    handleOperator(operator){

      let tmpArr = this.state.data;

      if(this.state.x !== "")
          tmpArr.push(this.state.x)
      
          tmpArr.push(operator)
      this.setState({
        data: tmpArr,
        display : this.state.display + operator,
        x:""
      })

      //console.log("After : " + tmpArr)
    }

    componentDidUpdate(){
     // console.log("input : " + this.state.x)
      //console.log("data : " + this.state.data)
      //console.log("display : " + this.state.display)
      //console.log("FLOAT : " + parseFloat("*"))
    }
    
    render() {
        const pad = [];

        for(let i = 0; i<10; i++)
        {
            pad.push(<Input key={numberToWords.toWords(i)} id={numberToWords.toWords(i)} operation={i} handler={this.handleInput}>{i}</Input>);
        }
      return (
        <div id="calculator">
        <div id="display">{this.state.display}</div>
        <Input id="equals" operation="=" handler={this.handleInput}/>
        {pad}
        <Input id="add" operation="+" handler={this.handleInput}/>
        <Input id="subtract" operation="-" handler={this.handleInput}/>
        <Input id="multiply" operation="*" handler={this.handleInput}/>
        <Input id="divide" operation="/" handler={this.handleInput}/>
        <Input id="decimal" operation="." handler={this.handleInput}/>
        <Input id="clear" operation="CL" handler={this.handleInput}/>

        <Input id="TEST" operation="TS" handler={this.setTest}/>
         <br />
        </div>
      )
    }
  }

  export default Calculator