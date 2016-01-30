// calculator

function calculatorApp() {
	// put it on an array and calculate it all when the equals is clicked
	// if operators are clicked one after the other, pop the last operator
	// from the array and push the new one
	var stack = [], is_float = false;
	var operators = ['-', '*', '/', '%', '+'];

	return {
		clickNumber: clickNumber,
		clickOperator: clickOperator,
		clickDecimal: clickDecimal,
		clearStack: clearStack,
		undo: undo,
		calculate: calculate
	}

	function clickDecimal() {

		// if last item in stack is an operand or if the stack is still empty, just add zero and a dot
		// put a zero
		if(operators.indexOf(stack[stack.length - 1]) !== -1 || stack.length === 0) {
			stack.push(0);
			stack.push('.');
			// indicate that the new number is a floating number
			// so that when the user clicked another number
			// we can add dot(.) in the stack before pushing
			// the new number
			is_float = true;
			console.log('current stack', stack);
		}

		// if the last item in the stack is a number
		// make sure that the number is not a floating number
		if( !(isNaN(stack[stack.length - 1])) && is_float === false) {
			// push a decimal point right there
			stack.push('.');
			// indicate that the new number is a floating number
			// so that when the user clicked another number
			// we can add dot(.) in the stack before pushing
			// the new number
			is_float = true;
			console.log('current stack', stack);
		}

	}

	function clickNumber(num) {
		// check if input is really a number
		if(!isNaN(num)){
			// if the last item in the stack is a zero and the new num is also zero
			// pop the last zero
			// make sure also that this is not a floating number
			// since a floating number can have consecutive zeros (0.0005)
			if(stack[stack.length - 1] === 0 && num === 0 && is_float === false) {
				stack.pop();
			}

			// // if the decimal operator is clicked before this number is clicked
			// // put a decimal before it
			// // make sure also the last item is not a decimal point
			// if(is_float && stack[stack.length - 1] !== '.') {
			// 	stack.push('.');
			// 	// reset is_float to false
			// 	//is_float = false;
			// }

			// push it to the array
			stack.push(num);
			console.log('current stack', stack);
		}
		
	}

	function clickOperator(operator) {
		// check the input is an operator
		if(operators.indexOf(operator) !== -1) {
			// check the last item on the stack is not an operator
			// otherwise, pop it and push the new operator
			if(operators.indexOf(stack[stack.length - 1]) !== -1) {
				stack.pop();
				console.log('the last item is an operator my dear so i pop it out');
			}

			// if the last item is a decimal point
			// pop it out
			if(stack[stack.length - 1] === '.') {
				stack.pop();
			}

			// add | for easier calculation later
			stack.push('|');

			stack.push(operator);

			// reset the is_float to false
			is_float = false;

			console.log('current stack', stack);
		}
	}

	function clearStack() {
		// clear the stack
		stack = [];
		console.log('current stack', stack);

	}

	function undo() {
		// undo last action
		// if last action item in stack is a decimal point
		// then reset is_float to false
		if(is_float && stack[stack.length - 1] === '.') {
			is_float = false;
		}

		//pop the last item
		stack.pop();		

		console.log('current stack', stack);
	}

	function calculate() {
		var items = '', result = 0, operator = null, number = 0;
		//var number = '', prev_operator = null;
		// if last item on stack is decimal point
		// pop it out
		if(stack[stack.length - 1] === '.') {
			stack.pop();
			console.log('i pop out the last item darling because either its an operand or a point');
		}
		// if last item is an operator, pop out the operand the | before it
		if(operators.indexOf(stack[stack.length - 1]) !== -1) {
			stack.pop();
			stack.pop();
			console.log('i pop out the last item darling because either its an operand or a point');
		}

		// join the current stack and split it using this operator | 
		items = stack.join('').split('|');
		for (var i=0 ; i < items.length; i++) {
			// if this is the first item, just assign it to result
			if(i === 0) {
				// use parseFloat because the other numbers in the stack might be floating numbers
				result = parseFloat(items[i]);
			} else{
				// get the number
				number = items[i].substr(1);
				operator = items[i].charAt(0);
				
				// addition
				if(operator === '+') {
					result += parseFloat(number);
				}

				// subtraction
				if(operator === '-') {
					result -= parseFloat(number);	
				}

				// multiplication
				if(operator === '*') {
					result *= parseFloat(number);	
				}

				// division
				if(operator === '/') {
					result /= parseFloat(number);	
				}

			}
		}

		// show the result on the screen
		jQuery('#result').html(result);

		console.log('items', items);
		console.log('result', result);
	}

}