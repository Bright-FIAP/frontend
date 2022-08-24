import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import chatService from '../../services/ChatService';

export function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const user = route.params.user;
  const chefBot = {
    _id: 1,
    name: 'chefBot',
    avatar: 'https://placeimg.com/140/140/any'
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Olá ${user.nome}, o que deseja hoje?`,
        createdAt: new Date(),
        user: {
          _id: chefBot._id,
          name: chefBot.name,
          avatar: chefBot.avatar,
        },
      },
    ]);
  }, []);

  const send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      let payload = {
        chatId: user._id,
        type: 'message',
        content: text,
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      chatService
      .send(payload)
      .then(response => {
        const data = response.data;
        let message1 = [
            {
              _id: Math.floor(Math.random() * 999999999999999999),
              text: data.content,
              createdAt: new Date(),
              user: {
                _id: chefBot._id,
                name: chefBot.name,
                avatar: chefBot.avatar,
              },
            },
          ];
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, message1),
            );
            append(message1);
      })
    }
  };

  const append = message => messages.push(message);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={send}
        user={{
          _id: 2,
          name: user.nome,
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </View>
  );
}
