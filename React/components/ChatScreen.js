import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const questionsAndAnswers = [
  {
    id: '1',
    question: 'Quero saber sobre produtos',
    answer: 'Os nossos produtos são feitos com materiais de alta qualidade e possuem garantia de 1 ano.',
  },
  {
    id: '2',
    question: 'Dúvidas sobre entregas',
    answer: 'As entregas são realizadas em até 7 dias úteis após a confirmação do pagamento.',
  },
  {
    id: '3',
    question: 'Problemas com pagamento',
    answer: 'Caso tenha problemas com pagamento, sugerimos verificar sua forma de pagamento ou entrar em contato com o suporte.',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleOptionSelect = (item) => {
    const newMessages = [
      ...messages,
      { id: Math.random().toString(), text: item.question, type: 'sent' },
      { id: Math.random().toString(), text: item.answer, type: 'received' },
    ];
    setMessages(newMessages);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessages = [
        ...messages,
        { id: Math.random().toString(), text: inputText, type: 'sent' },
      ];
      setMessages(newMessages);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.type === 'sent' ? styles.sent : styles.received,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.optionsContainer}>
        <FlatList
          horizontal
          data={questionsAndAnswers}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionBubble}
              onPress={() => handleOptionSelect(item)}
            >
              <Text style={styles.optionText}>{item.question}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.optionsList}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="attach-file" size={24} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite uma mensagem"
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Icon name="send" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
  chatContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  optionsList: {
    paddingHorizontal: 10,
  },
  optionBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  iconButton: {
    padding: 10,
  },
});
