import { useState } from "react";
import {Button, TextInput, View} from 'react-native';
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
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Não possui conta? Cadastre-se" onPress={() => navigation.navigate('SignUp')} />
        </View>
    )
}

export default LoginScreen;