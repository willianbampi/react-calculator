import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentIndex: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if(this.state.currentIndex === 0) {
            this.setState({ operation, currentIndex: 1, clearDisplay: true })
        } else {
            const finish = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                if(currentOperation === '+') {
                    values[0] = values[0] + values[1]
                } else if (currentOperation === '-') {
                    values[0] = values[0] - values[1]
                } else if (currentOperation === '/') {
                    values[0] = values[0] / values[1]
                } else if (currentOperation === '*') {
                    values[0] = values[0] * values[1]
                } else {
                    values[0] = this.state.values[0]
                }
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({ 
                displayValue: values[0],
                operation: finish ? null : operation,
                currentIndex: finish ? 0 : 1,
                clearDisplay: !finish,
                values
            })
        }
    }

    addDigit(digit) {
        
        if(digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if(digit !== '.') {
            const index = this.state.currentIndex
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[index] = newValue
            this.setState({ values })
        }
    }

    render() {
        
        const clearMemory = () => this.clearMemory()
        const setOperation = operation => this.setOperation(operation)
        const addDigit = digit => this.addDigit(digit)
        
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={clearMemory} triple />
                <Button label="/" click={setOperation} operation />
                <Button label="7" click={addDigit} />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" click={setOperation} operation />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" click={setOperation} operation />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" click={setOperation} operation />
                <Button label="0" click={addDigit} double />
                <Button label="." click={addDigit} />
                <Button label="=" click={setOperation} operation />
            </div>
        )
    }
}