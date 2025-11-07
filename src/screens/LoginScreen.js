import { useState } from "react";
import {Text, StyleSheet, TouchableOpacity, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {auth} from '../config/firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email,passsword)
            .then(userCredentials => {
                const user = userCredentials.user;
                //useDispatch({type: 'SET_USER', payload: user});
                console.log("Login com: ", user.email);
                navigation.navigate('Chat');
            })
            .catch(error => alert(error.message));
    };

    return (
      <>
      <Text style={styles.texto}>Entre no chatApp</Text>
        <View style={styles.container}>
            <TextInput style={styles.campoTexto} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.campoTexto} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={styles.botao} onPress={handleLogin}>Entrar</TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('SignUp')}>Não possui conta? Cadastre-se</TouchableOpacity>
        </View>
      </>
    )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#2BF3B7",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },

  botao: {
    color: "#2BF3B7",
    backgroundColor: "#F32B67",
    textAlign: 'center',
    fontFamily: "arial",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 5,
    margin: 7
  
  },

  campoTexto: {
    backgroundColor: "#FDE69B",
    padding: 10,
    margin: 7,
    borderRadius: 5
  },

  texto: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F32B67',
    marginTop: 10
  }

})


export default LoginScreen;
