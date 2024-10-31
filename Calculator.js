// Calculator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [result, setResult] = useState('0');
  const [expression, setExpression] = useState('');

  const handlePress = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('0');
    } else if (value === '=') {
      try {
        const evalResult = eval(expression); // Evaluate the expression
        setResult(String(evalResult));
        setExpression(String(evalResult));
      } catch (error) {
        setResult('Error');
      }
    } else {
      setExpression((prev) => prev + value);
      setResult((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const renderButton = (label) => (
    <TouchableOpacity
      key={label}
      style={styles.button}
      onPress={() => handlePress(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const buttons = [
    ['C', '()', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.flat().map((button) => renderButton(button))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  resultText: {
    fontSize: 48,
    color: '#333',
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flexBasis: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
});

export default Calculator;
