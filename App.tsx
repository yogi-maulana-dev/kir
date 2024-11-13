import React, {Component} from 'react';
import {Text, Button, TextInput, View, StyleSheet} from 'react-native';

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Enter text here" style={styles.input} />
        <Button title="TULISAN" onPress={() => alert('Button pressed')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '80%',
  },
});

export default App;
