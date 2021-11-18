import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export default class BodyComponent implements OnInit {
  //Initialize input and result strings are empty
  input:string = "";
  result:string = "";

  //pressNumber Method is used to take number value and display input value
  pressNumber(num:string){
    //if condition is going to check if input number is . or not
    if(num=="."){
      //if input is not null then we are going to take last number as last operand 
        if(this.input!=""){
          const lastNumber = this.getLastOperand()
          console.log(lastNumber.lastIndexOf("."))
          //here return last number by checking if condition
          if(lastNumber.lastIndexOf(".")>=0)return 
        }
    }
    //if num is zero return input is empty
    if(num=="0"){
      if(this.input == ""){
        return
      }
      //take prevOperator and check if Condition
      const prevOperator = this.input[this.input.length-1];
      //if Operator is arithmetic or not and return prevOperator
      if(prevOperator === '/' || prevOperator === '*' || prevOperator === '-' || prevOperator=== '+'){
        return
      }
    }
    //add num value to input
    this.input = this.input + num
    if(this.input.length<11){
      this.calculateInput()
    }else if(this.input.length == 11){
      alert("Only 10 digits or allowed")
      this.input = ""
      this.result = ""
    }  
  }
  /**
   * @description here we are get last operand of the given input
   * @returns operand
   */
  getLastOperand() {
    let operand:number;
    console.log(this.input)
    operand=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > operand) operand=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > operand) operand=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > operand) operand=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(operand+1))
    return this.input.substr(operand+1)
  }
  /**
   * @param {*} op
   * @description while we are press Operator button this will execute
   * @returns Operator
   */
  pressOperator(op: string) { 
    const Operator = this.input[this.input.length - 1];
    if (Operator === '/' || Operator === '*' || Operator === '-' || Operator === '+')  {
      return;
    }   
    this.input = this.input + op
    this.calculateInput();
  }
  /**
   * @description while we are press backspace button,it clear one value from input
   */
  backSpace() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
  /**
   * @description while we are press clear button,it clear all value from input
   */
  allClear() {
    this.result = '';
    this.input = '';
  }
  /**
   * @description here we are calculate given input by separate Operators and operands
   */
  calculateInput() {
    let formula = this.input;
 
    let lastValue = formula[formula.length - 1];
 
    if (lastValue === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    let Operator = formula[formula.length - 1];
 
    if (Operator === '/' || Operator === '*' || Operator === '-' || Operator === '+' || Operator === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);
  }
  /**
   * @description here we get solution of given input
   */
  getSolution() {
    this.calculateInput();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }

  
  constructor() { }

  ngOnInit(): void {
  }
 
}
