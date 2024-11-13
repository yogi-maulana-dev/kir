import React, {Component} from 'react';
import {
  Text,
  Button,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

function colek() {
  alert('Meow...');
}

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, fontWeight: 'bold'}}>Selamat Datang</Text>

        <Image source={require('./gambar/images.jpeg')} style={styles.image} />

        {/* Uncomment this if you'd like to use an image from a URL instead */}
        {/* 
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGLb1IXdjommJUROhJZl5nF0VWAohIPNFBrpQ8Iv-9BahNHqy30B9INrehNM7A-k68Es',
          }}
          style={styles.image}
        /> 
        */}

        <TextInput placeholder="Enter text here" style={styles.input} />

        <Button title="TULISAN" onPress={colek} />

        <TouchableOpacity onPress={colek} style={styles.touchable}>
          <Text style={styles.touchableText}>Colek Aku Jugah</Text>
        </TouchableOpacity>
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
  image: {
    width: 300,
    height: 300,
    marginVertical: 20, // Add vertical margin to create space above and below the image
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '80%',
  },
  touchable: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  touchableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
