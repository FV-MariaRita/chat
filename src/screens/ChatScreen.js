import React, { useState, useCallback, useEffect } from "react";
import { View } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { db, auth } from '../config/firebase';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsuscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                text: doc.data().text,
                createdAt: doc.data().createdAt.toDate(),
                user: doc.data().user
            })));
        });

        return unsuscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {_id, createdAt, text, user} = messages[0];
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    return (
        <View style={{flex: 1, paddingVertical: 30}}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth.currentUser.email,
                    name: auth.currentUser.email    
                }}
            />
        </View>
    )
}

export default ChatScreen;