import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import chatService from '../../services/ChatService';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';


require('dayjs/locale/pt-br');

let gravandoAudio = false;

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

  let recording = new Audio.Recording();
  let gravandoAudio = false;

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const renderActions = props => {
    async function startRecording() {
      try {
        recording = new Audio.Recording();
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        console.log('Starting recording..');
        gravandoAudio = true;
        await recording.prepareToRecordAsync(
          (Audio.RecordingOptionsPresets.HIGH_QUALITY),
        );
        await recording.startAsync();
        console.log('Recording started');
      } catch (err) {
        gravandoAudio = false;
        console.error('Failed to start recording', err);
      }
    }

    async function stopRecording() {
      console.log('Stopping recording..');
      await recording.stopAndUnloadAsync();
      gravandoAudio = false;
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);

      const fs = require("expo-file-system");
      let buffer = fs.readDirectoryAsync(`${uri}`);
      let fileY = new File([new Uint8Array(buffer)], 'file.mp3', {
        type: 'audio/mpeg'
      });
      let form = new FormData();
      form.append("file", fileY);

      Alert.alert('Enviando aúdio...');
      console.log(recording);
      let payload = {
        content: form,
        type: 'audio',
      };
      chatService.send(payload).then(response => {
        const data = response.data;
        console.log(data);
      });
    }
    console.log(recording);

    return (
      <Actions
        {...props}
        options={{
          ['Audio']: async props => {
            gravandoAudio ? stopRecording() : startRecording();
          },
          ['Imagem']: async props => {
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
