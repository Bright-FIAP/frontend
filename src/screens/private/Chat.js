import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import chatService from '../../services/ChatService';
import * as ImagePicker from 'expo-image-picker';
require('dayjs/locale/pt-br');

function randomId() {
  return Math.floor(Math.random() * 999999999999999999);
}

export function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const user = route.params.user;
  const chefBot = {
    _id: 1,
    name: 'chefBot',
    avatar: 'https://placeimg.com/140/140/any',
  };

  const chefBotUser = {
    createdAt: new Date(),
    user: {
      ...chefBot,
    },
  };

  const renderActions = props => {
    return (
      <Actions
        {...props}
        options={{
          ['Image']: async props => {
            try {
              let permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

              if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
              }
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true,
              });
              if (result?.cancelled) {
                console.log('User cancelled!');
              }
              Alert.alert('Imagem em análise...');
              let payload = {
                content: result.base64,
                type: 'image',
              };

              chatService.send(payload).then(response => {
                const data = response.data;
                if (data.ingredient_predicted !== 'undefined') {
                  let messageResponse = [
                    {
                      ...chefBotUser,
                      _id: randomId(),
                      text:
                        'A imagem enviada é de um ' +
                        data.ingredient_predicted +
                        '.',
                    },
                  ];
                  setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, messageResponse),
                  );
                  append(messageResponse);
                }
              });
            } catch (e) {
              throw e;
            }
          },
          ['Cancelar']: props => {},
        }}
        onSend={send}
      />
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Olá ${user.nome}, o que deseja hoje?`,
        ...chefBotUser,
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
      chatService.send(payload).then(response => {
        const data = response.data;
        let messageResponse = [
          {
            ...chefBotUser,
            _id: randomId(),
            text: data.content,
          },
        ];
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messageResponse),
        );
        append(messageResponse);
      });
    }
  };

  const append = message => messages.push(message);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        locale="pt-br"
        timeFormat="HH:mm"
        placeholder="Mensagem"
        messages={messages}
        onSend={send}
        renderActions={() => renderActions()}
        user={{
          _id: 2,
          name: user.nome,
          avatar: 'https://placeimg.com/140/140/any',
        }}
        isAnimated
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: { backgroundColor: '#5c5c5c', color: '#fff555' },
                right: { backgroundColor: '#edad0e' },
              }}
              textStyle={{ left: { color: '#ffffff' } }}
            />
          );
        }}
      />
    </View>
  );
}
