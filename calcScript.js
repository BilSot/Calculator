var pressedNumber;
var operand1, operand2;
var memoryValue = 0;
var operator, decimal, display;
var hasResult = false;
//var messageVar = 'This text should be alerted.\n\
//But it is not';
//alert("1"+2+3);
$(function () {

	$("#calcScreen").val('0');
	decimal = $("#decimalSign").html();

	$(".numbers").click(function () {
		numberClicked($(this).html());
	});

	$(".unaryButtons").click(function () {
		operator = $(this).html();
		checkUnaryOperator();
	});

	$(".mathOperators").click(function () {
		operatorClicked($(this).html());
	});

	$("#equationSign").click(function () {
		calculateBinaryResult();
	});

	$("#decimalSign").click(function () {
		addDecimalPoint();
	});

	$("#negationButton").click(function () {
		negateNumber();
	});

	$("#cButton").click(function () {
		eraseAll();
	});

	$("#backspaceButton").click(function () {
		eraseLastChar();
	});

	$("#memoryPlus").click(function () {
		addNumberInMemory();
	});
	
	$("#memoryMinus").click(function(){
		subtractFromMemory();
	});
	
	$("#memoryRecall").click(function() {
		showMemory();
	});
	
	$("#memoryClear").click(function(){
		clearMemory();
	});

	var action = 1;
	var btnText = $("#changeBckground").html();
	$("#changeBckground").click(function () {
		if (action == 1) {
			$("link[rel=stylesheet]").attr({href: 'pinkTheme.css'});
			$("#changeBckground").html("Blue background");
			action = 2;
		} else {
			$("link[rel=stylesheet]").attr({href: 'calc.css'});
			$("#changeBckground").html(btnText);
			action = 1;
		}
	});
});

function eraseAll() {
	$("#calcScreen").val('0');

	operand1 = operand2 = null;
	operator = null;
	display = 0;

	updateDisplay();
}

function eraseLastChar() {
	if (hasResult) {
		//play some error sound
		return;
	}

	if (operand1.length > 1 && !operator && !operand2) {
		operand1 = operand1.slice(0, -1);
		display = operand1;
	} else if (operand1.length == 1 && !operator && !operand2) {
		operand1 = operand1.slice(0, -1);
		operand1 = 0;
		display = operand1;
	}

	if (operand1 && operator && !operand2) {
		return;
	}

	if (operand2) {
		if (operand2.length > 1) {
			operand2 = operand2.slice(0, -1);
			display = operand1 + operator + operand2;
		} else {
			operand2 = operand2.slice(0, -1);
			operand2 = 0;
			display = operand1 + operator + operand2;
		}
	}

	updateDisplay();
}

function operatorClicked(newOperator) {
	if (!operand1) {
		display = operand1 = 0;
	}
	if (operand2) {
		calculateBinaryResult();
		operand1 = display;
	}
	else if (operator) {
		display = operand1;
	}
	operator = newOperator;
	display += operator;

	updateDisplay();
}

function addDecimalPoint() {
	if (!operator) {
		if(!operand1 || hasResult){
			operand1 = 0 + ".";
			hasResult = false;
		}
		operand1 = checkForDecimalPoint(operand1);
		display = operand1;
	} else {
		if(!operand2){
			operand2 = 0 + ".";
		}
		operand2 = checkForDecimalPoint(operand2);
		display = operand1 + operator + operand2;
	}
	updateDisplay();
}

function checkForDecimalPoint(number){
	if(number.toString().indexOf(".") == -1){
		number += ".";
	}
	return number;
}

function numberClicked(pressedNumber) {

	if (!operator) {
		if (hasResult) {
			operand1 = pressedNumber + "";
			hasResult = false;
			display = operand1;
			updateDisplay();
			return;
		}
		if (pressedNumber == 0 && (operand1 == null || operand1 == 0)) {
			return;
		}
		else if (operand1) {
			operand1 += pressedNumber;
		}
		else {
			operand1 = pressedNumber + "";
		}
		display = operand1;
	} else {
		if (pressedNumber == 0 && operand2 == null) {
			operand2 = 0;
		} else if (pressedNumber == 0 && operand2 != null) {
			operand2 += 0;
		} 
		else if (operand2 == null ) {
			operand2 = pressedNumber;
		}
		else{
			operand2 += pressedNumber;
		}
		display = operand1 + operator + operand2;
	}
	updateDisplay();
}

function negateNumber() {

	if (operand2) {
		if (operand2.indexOf("-") > -1) {
			operand2 = operand2.replace("-", "");
		}
		else {
			operand2 = "-" + operand2;
		}
		display = operand1 + operator + operand2;
	} else if (operand1) {
		if (operand1.indexOf("-") > -1) {
			operand1 = operand1.replace("-", "");
		}
		else {
			operand1 = "-" + operand1;
		}
		
		if (operator) {
			display = operand1 + operator;
		} else {
			display = operand1;
		}
	}

	updateDisplay();
}

function calculateBinaryResult() {
	if (!operator) {
		return;
	}
	var result;
	if (operator === '+') {
		result = parseFloat(operand1) + parseFloat(operand2);
	}

	if (operator === '-') {
		result = parseFloat(operand1) - parseFloat(operand2);
	}

	if (operator === '*') {
		result = parseFloat(operand1) * parseFloat(operand2);
	}

	if (operator === '/') {
		result = parseFloat(operand1) / parseFloat(operand2);
	}
	display = result + '';
	updateDisplay();

	hasResult = true;
	operand1 = display;
	operand2 = null;
	operator = null;
}

function checkUnaryOperator() {
	var result;
	if (operator === 'x^2') {
		result = parseFloat(operand1) * parseFloat(operand1);
	}

	if (operator === '\u221A') {
		result = Math.sqrt(parseFloat(operand1));
	}

	if (operator === '1/x') {
		result = (1 / parseFloat(operand1));
	}
	display = result + '';
	updateDisplay();

	hasResult = true;
	operand1 = display;
	operand2 = null;
	operator = null;
}

function addNumberInMemory() {
	
	if (!operator) {
		if (operand1) {
			memoryValue += parseFloat(operand1);
		}
	} else {
		if (!operand2) {
			memoryValue += parseFloat(operand1);
		}
		else {
			memoryValue += parseFloat(operand2);
		}
	}
	updateMemoryIndicator();
	
}

function subtractFromMemory(){
	if (!operator) {
		if (operand1) {
			memoryValue -= parseFloat(operand1);
		}
	} else {
		if (!operand2) {
			memoryValue -= parseFloat(operand1);
		}
		else {
			memoryValue -= parseFloat(operand2);
		}
	}
	
	updateMemoryIndicator();
	console.log(memoryValue);
}

function showMemory(){
	if (!operator) {
		operand1 = memoryValue;
	} else {
		operand2 = memoryValue;
	}
	display = operand1 + operator + operand2;
	updateDisplay();
}

function clearMemory(){
	memoryValue = 0;
	updateMemoryIndicator();
}

function updateMemoryIndicator(){
	if(memoryValue != 0){
		$("#memorySign").css("visibility", "visible");
	}else{
		$("#memorySign").css("visibility", "hidden");
	}
}

function updateDisplay() {
//	if (display !== 0) {
	$("#calcScreen").val(display);
//	}
}