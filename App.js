import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';



export default function App() {
  const apiKey = 'O77bcFZdLBsRW5Ll7GGoj260ABFkI2Ge'; // Put your own API key here
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [currencies, setCurrencies] = useState([]); 

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`https://api.apilayer.com/currency_data/list`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.currencies);
        setCurrencies(currencyList);
      })
      .catch((error) => {
        console.error('Error fetching currencies', error);
      });
  }, [apiKey]);

  const handleConvert = () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
      .then(response => response.json()) 
      .then(data => {

        const result = parseFloat(data.result).toFixed(2); 
        setConversionResult(result);
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>From Currency</Text>
        <Picker
          selectedValue={fromCurrency}
          onValueChange={(itemValue, itemIndex) => setFromCurrency(itemValue)}
          style={{ width: 130}}

        >
          {currencies.map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>To Currency</Text>
        <Picker
          selectedValue={toCurrency}
          onValueChange={(itemValue, itemIndex) => setToCurrency(itemValue)}
          style={{ width: 130}}
        >
          {currencies.map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
            ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={amount}
          onChangeText={text => setAmount(text)}
          keyboardType="numeric"
        />
      </View>
      <Button title="Convert" onPress={handleConvert} />
      {conversionResult !== null && (
        <Text style={styles.result}>Result: {conversionResult}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
  },
  result: {
    fontSize: 16,
    marginTop: 20,
  },
});