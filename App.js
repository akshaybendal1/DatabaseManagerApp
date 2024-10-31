import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Modal } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]); // State to store the winning combination
  const [isSinglePlayer, setIsSinglePlayer] = useState(null); // null indicates no mode selected
  const [showModal, setShowModal] = useState(false); // New state for modal visibility

  // Function to check for a winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(line); // Set the winning line
        return squares[a];
      }
    }
    return null;
  };

  // Function to handle square press
  const handlePress = (index) => {
    if (board[index] || winner || (isSinglePlayer && !isXNext)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setShowModal(true); // Show modal when there's a winner
    }
  };

  // AI Move for single-player mode
  const aiMove = () => {
    if (isSinglePlayer && !isXNext && !winner) {
      const emptySquares = board
        .map((value, index) => (value === null ? index : null))
        .filter((val) => val !== null);

      if (emptySquares.length > 0) {
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const newBoard = board.slice();
        newBoard[randomIndex] = 'O';
        setBoard(newBoard);
        setIsXNext(true);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
          setWinner(gameWinner);
          setShowModal(true); // Show modal when there's a winner
        }
      }
    }
  };

  // Trigger AI move after every player's move
  useEffect(() => {
    if (isSinglePlayer && !isXNext && !winner) {
      aiMove();
    }
  }, [board]);

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]); // Reset the winning line
    setShowModal(false); // Hide the modal
  };

  // Render a single square
  const renderSquare = (index) => (
    <TouchableOpacity
      style={[styles.square, winningLine.includes(index) && styles.winningSquare]}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  // Render the game board or mode selection menu
  return (
    <View style={styles.container}>
      {isSinglePlayer === null ? (
        <View>
          <Text style={styles.title}>Choose Mode</Text>
          <Button title="Single Player" onPress={() => setIsSinglePlayer(true)} />
          <Button title="Multiplayer" onPress={() => setIsSinglePlayer(false)} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <View style={styles.board}>
            {Array(9).fill(null).map((_, index) => renderSquare(index))}
          </View>
          {winner ? <Text style={styles.winnerText}>Winner: {winner}</Text> : <Text style={styles.nextPlayer}>Next Player: {isXNext ? 'X' : 'O'}</Text>}
          <Button title="Restart Game" onPress={resetGame} />
          <Button title="Change Mode" onPress={() => { resetGame(); setIsSinglePlayer(null); }} />
        </>
      )}

      {/* Modal for displaying the winner */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Winner: {winner}! 🎉</Text>
            <Button title="Play Again" onPress={resetGame} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  winningSquare: {
    backgroundColor: 'lightgreen', // Highlight winning squares
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  nextPlayer: {
    fontSize: 20,
    marginTop: 20,
  },
  winnerText: {
    fontSize: 24,
    color: 'green',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
