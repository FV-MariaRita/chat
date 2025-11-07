import { useState } from "react";
import { TouchableOpacity, TextInput, View, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth } from "../config/firebase";

const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                //useDispatch({type: 'SET_USER', payload: user});
                console.log('Cadastrado com: ', user.email);
                navigation.navigate('Login');
            })
            .catch(error => alert(error.message));
    };

    return (
        <>
        <Text style={styles.texto}>Cadastre-se no ChatApp</Text>
        <View style={styles.container} >
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.campoTexto}/>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.campoTexto}/>
            <TouchableOpacity title="Cadastrar" onPress={handleSignUp} style={styles.botao}> 
              Cadastrar 
            </TouchableOpacity>
            <TouchableOpacity title="Já possui conta? Login" onPress={() => navigation.navigate('Login')} style={styles.botao}> 
              Já possui conta? Login 
            </TouchableOpacity>
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

export default SignUpScreen;
