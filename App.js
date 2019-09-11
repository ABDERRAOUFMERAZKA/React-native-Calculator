import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native'
import { ROWS, BUTTONS } from './constant.js'
import { whileStatement } from '@babel/types'

export default class App extends Component {

  constructor( ) {
    super()
    this.state = {
      numberPressed: "",
      calculationText: 0
    }
  }

  operate(operation) {
    const {numberPressed} = this.state
    switch(operation) {
      case 'DEL':
        let text = numberPressed.split('')
        text.pop()
        numberPressed !== "" && this.setState(() => ({
          numberPressed: text.join('')
        }))
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = numberPressed.split('').pop()
        if(
          numberPressed !== "" &&
            (
              lastChar !== '-' &&
              lastChar !== '+' &&
              lastChar !== '*' &&
              lastChar !== '/'
            )
         )    
        {
          return this.setState({
            numberPressed: numberPressed + operation
          })
        }

    }
  }

  validate() {
    const { numberPressed } = this.state
    switch (numberPressed.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    } return true
  }
  calculateResult() {
    const { numberPressed } = this.state
    this.setState({
      calculationText: this.validate() && eval(numberPressed)
    })
  }


  buttonPressed(text) {
    const {numberPressed} = this.state
    if (text === '=') {
      return this.calculateResult()
    }

    this.setState(() => ({
     numberPressed: numberPressed+text,
    }))
  }

  render() {
    const { numberPressed, calculationText } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {numberPressed}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            { calculationText }
          </Text>
        </View>
        <View style={styles.buttons}>
            <View style={styles.numbers}>
              {
                ROWS &&
                ROWS.map(row => (
                  <View style={styles.row} key={row.id}>
                    {
                      row &&
                      row.data.map(number => (
                        <TouchableOpacity
                          style={styles.btn}
                          key={number.id}
                          onPress={() => this.buttonPressed(number.value)}
                        >
                          <Text style={styles.btnText}>{number.value}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                ))
              }
            </View>
            <View style={styles.operations}>
              {
                BUTTONS &&
                BUTTONS.map(button => (
                  <TouchableOpacity
                    key={button.id}
                    style={styles.btn}
                    onPress={() => this.operate(button.value)}
                  >
                    <Text style={styles.opButton}>{button.value}</Text>
                  </TouchableOpacity>
                ))
              }         
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 30,
    color: 'black'
  },
  opButton: {
    color: 'white',
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    color: 'red',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 30,
    color: 'white'
  },
  calculationText: {
    fontSize: 24,
    color: 'black'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363'
  }
})