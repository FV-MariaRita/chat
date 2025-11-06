import React, { useState, useCallback, useEffect } from "react";
import { View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
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

                 renderBubble={(props) => (
                    <Bubble
                    {...props}
                    wrapperStyle={{
                        right: { backgroundColor: '#093f7eff' },
                        left: { backgroundColor: '#e09407ff' }
                    }}
                    textStyle={{
                        right: { color: '#fff' },
                        left: { color: '#000' }
                    }}
                    />
                )}

                 renderSend={(props) => (
                    <Send {...props}>
                    <View style={{ marginRight: 10, marginBottom: 5 }}>
                        <Icon name="send" size={28} color="#574272ff" />
                    </View>
                    </Send>
                 )}

                  renderInputToolbar={(props) => (
                    <InputToolbar
                    {...props}
                    containerStyle={{
                        borderTopWidth: 1,
                        borderTopColor: '#9e196bff',
                        backgroundColor: '#ffa3ceff',
                    }}
                    />
                )}
            />
            
        </View>
    )
}

export default ChatScreen;
