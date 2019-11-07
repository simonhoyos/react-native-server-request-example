import React, { useEffect } from 'react';
import { Text, Button, AsyncStorage } from 'react-native';

export default function Login({ navigation }) {
  useEffect(() => {
    AsyncStorage.setItem('token', 'Algo secreto');
    // AsyncStorage.removeItem('token');
  }, []);

  // async function handleSubmit() {
  //   const data = state;

  //   const token = await axios.post('/login', data);
  //   AsyncStorage.setItem('token', token);
  // }

  async function handlePress() {

    const token = await AsyncStorage.getItem('token');
    console.log(token);

    if (!token) {
      navigation.replace('home');
    }
  }

  return (
    <>
      <Text>Login</Text>
      <Button
        title="Print AsyncStorage"
        onPress={handlePress}
      />
    </>
  );
}
