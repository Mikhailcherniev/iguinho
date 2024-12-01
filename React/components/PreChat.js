import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

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

export default function PreChat() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionSelect = (item) => {
    setSelectedAnswer(item.answer);
    setShowOptions(true);
  };

  const handleFeedback = (feedback) => {
    console.log(`Feedback: ${feedback}`);
    if (feedback === 'atendente') {
      alert('Conectando com atendente...');
    } else {
      alert(`Obrigado pelo seu feedback: ${feedback}`);
    }
    setSelectedAnswer(null);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      {!selectedAnswer ? (
        <>
          <Text style={styles.title}>Como podemos ajudar você?</Text>
          <FlatList
            data={questionsAndAnswers}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleOptionSelect(item)}
              >
                <Text style={styles.cardText}>{item.question}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <>
          <Text style={styles.answer}>{selectedAnswer}</Text>
          {showOptions && (
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsTitle}>Foi sanada sua dúvida?</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.feedbackButton, styles.yesButton]}
                  onPress={() => handleFeedback('Sim')}
                >
                  <Text style={styles.feedbackButtonText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.feedbackButton, styles.noButton]}
                  onPress={() => handleFeedback('Não')}
                >
                  <Text style={styles.feedbackButtonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.feedbackButton, styles.contactButton]}
                  onPress={() => handleFeedback('atendente')}
                >
                  <Text style={styles.feedbackButtonText}>Quero falar com um atendente</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
  },
  answer: {
    fontSize: 18,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#28a745',
  },
  noButton: {
    backgroundColor: '#dc3545',
  },
  contactButton: {
    backgroundColor: '#007bff',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
