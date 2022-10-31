import React, { useState } from 'react';
import '../components/Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState(''); //the initial state of the main display is blank upon loading
  const [predisplay, setPredisplay] = useState(''); //the initial state of the smaller predisplay is blank upon loading
  const ops = ['/', '*', '+']; //creating an array of operators and assigning contents to a variable
  const nonStarter = ['0']; //creating a variable of nonStarter with a value of zero
  const decimal = ['.']; //creating a decimal variable

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; //creating an array of numbers

  const backspace = () => {
    //function that resets the display and predisplay
    setDisplay('');
    setPredisplay('');
  };

  const calculate = () => {
    //function that evaluates the input of the display (however it has to be in string format)
    setDisplay(eval(predisplay).toString()); //then it sets the display to the calculated result
    setPredisplay(predisplay + '='); //it also sets the predisplay to the entire equation and adds an equal sign to the end of the predisplay
  };

  const updateDisplay = (input) => {
    //function that updates the display and predisplay depending on what is input

    if (ops.includes(input) && predisplay === '') {
      //if operators are included in the input, yet no digits have been entered yet, nothing will happen. This ensures that the equation can't start with an operator.
      return;
    }

    let multops = predisplay.match(/[*/+-]{1,}(?!\d)/); //variable assigned to a regex stating: The display shows one or more operators are entered and they are not followed by a digit.
    if (multops && ops.includes(input)) {
      //if multops is true and an operator is included in the input...
      let changedOp = predisplay.replace(multops, input); //a variable is created called changedOp. This replaces the multops with the current operator input. Thereby preventing more than one operator from being evaluated.
      return setPredisplay(changedOp) && setDisplay(changedOp + input); //The predisplay is changed accordingly to the current changedOp without affecting any digits, while the Display shows basically everything being input.
    }

    if (predisplay[predisplay.length - 1] === '=' && numbers.includes(input)) {
      //If the last character of the predisplay string is an = sign, and numbers are included in the next input, then the predisplay will be cleared and set to the current input for a new equation. Ex(5+6=13, 4+2=6)
      return setPredisplay(input);
    }
    if (predisplay[predisplay.length - 1] === '=' && ops.includes(input)) {
      //If the last character of the predisplay string is an = sign, and an operator is included in the next input, it will set the predisplay to the current result on the display and concatenate the input operator on the end of it. Ex(5+6+=13+4=17)
      return setPredisplay(display + input);
    }

    if (nonStarter.includes(input) && predisplay === '') {
      //If the first input is a zero and the predisplay is blank, nothing will happen
      return;
    }
    if (
      (decimal.includes(input) && decimal.includes(predisplay.slice(-1))) || //If the last character of the string entered was a decimal and a decimal is in the input or....
      (predisplay.match(/\.\d{1,}(?![/*-=+])/) && decimal.includes(input)) //If the predisplay starts with a decimal followed by 1 or more digits NOT followed by an operator and a decimal is in the input, nothing will happen. Ex(.3 is ok, ..3 is not ok, .3+.2 is ok, .3.2 is not ok)
    ) {
      return;
    }

    setDisplay(display + input); //default behavior sets the display to its current state concatenated with the current input
    setPredisplay(predisplay + input); //default behavior sets the predisplay to its current state concatenated with the current input
  };

  const createDigits = (par, end) => {
    //function to help me create rows. It takes a starting parameter  and an ending parameter.
    let digits = []; //empty array assigned to a variable
    let ids = [
      //An array in order of the ids which will be iterrated through.
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
    for (let i = par; i < end; i++) {
      //i starts at the given starting parameter and ends at the given end parameter
      digits.push(
        //everything below is pushed into the array according to the parameters to create some buttons
        <div className='col' key={i}>
          <button
            onClick={() => updateDisplay(i.toString())} //calling the updateDisplay function onClick. It takes a parameter of the current index to update the display
            id={ids[i - 1]} //since we aren't including a zero key in the create digits function the id has to be set to the ids array index minus 1
            key={i} //the unique key is set to the index
          >
            {i}
          </button>
        </div> //the inner text of the button is set to the index
      );
    }

    return digits; //the newly created array is returned on load.
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='row'>
          <div className='predisplay'>{predisplay}</div>
          <div className='col-display' type='text' id='display'>
            {display || '0'}
          </div>
        </div>
        <div className='row'>
          <div className='col-wide'>
            <button value='0' onClick={() => backspace()} id='clear'>
              AC
            </button>
          </div>
          <div className='col'>
            <button value='/' onClick={() => updateDisplay('/')} id='divide'>
              /
            </button>
          </div>
          <div className='col'>
            <button value='*' onClick={() => updateDisplay('*')} id='multiply'>
              x
            </button>
          </div>
        </div>
        <div className='row'>
          {createDigits(7, 10)}

          <div className='col'>
            <button value='+' onClick={() => updateDisplay('+')} id='add'>
              +
            </button>
          </div>
        </div>
        <div className='row '>
          {createDigits(4, 7)}

          <div className='col'>
            <button value='-' onClick={() => updateDisplay('-')} id='subtract'>
              -
            </button>
          </div>
        </div>
        <div className='row '>
          {createDigits(1, 4)}

          <div className='col-tall'>
            <button value='=' onClick={() => calculate('=')} id='equals'>
              =
            </button>
          </div>
        </div>
        <div className='row '>
          <div className='col-wide'>
            <button value='0' onClick={() => updateDisplay('0')} id='zero'>
              0
            </button>
          </div>
          <div className='col'>
            <button value='.' onClick={() => updateDisplay('.')} id='decimal'>
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calculator;
