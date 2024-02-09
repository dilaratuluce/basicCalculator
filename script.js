class Calculator {      // bu class'ta previousOperandText veya currentOperand vb. tanımlanmadı ama bunlar kullanırken tanımlanmış oluyor
    constructor(givenPreviousOperandText, givenCurrentOperandText) {
        this.previousOperandTextRef = givenPreviousOperandText 
        this.currentOperandTextRef = givenCurrentOperandText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // dont take the last digit
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // === ?
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '' 
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if (decimalDigits != null) {
            //return ''
            return integerDisplay + "." + decimalDigits
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextRef.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextRef.innerText = this.getDisplayNumber(this.previousOperand.toString()) + " " + this.operation.toString()
        }
        else{
            this.previousOperandTextRef.innerText = this.getDisplayNumber(this.previousOperand)
        }
    }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})