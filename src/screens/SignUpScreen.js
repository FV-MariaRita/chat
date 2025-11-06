import { useState } from "react";
import { Button, TextInput, View } from 'react-native';
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
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <Button title="Cadastrar" onPress={handleSignUp} />
            <Button title="Já possui conta? Login" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default SignUpScreen;