const createDeck = () => {
  const suit = ['H', 'D', 'S', 'C'];
  const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  // make a deck
  const deck = suit.map((type) => cards.map((card) => `${type}${card}`));
  return deck.flat();
};

// shuffle cards
const shuffle = (pack) => {
  const deck = pack.flat();
  let totalCards = deck.length;
  let card = 0;
  let holder = null;

  while (totalCards > 0) {
    card = Math.floor(Math.random() * totalCards--);
    holder = deck[totalCards];
    deck[totalCards] = deck[card];
    deck[card] = holder;
  }
  return deck;
};

// Split Deck
const dealCards = (shuffledDeck) => {
  const players = [];
  players[0] = shuffledDeck.slice(0, 26);
  players[1] = shuffledDeck.slice(26);

  return players;
};

// Choose Game Starter
const starter = () => (Math.random() < 0.3 ? 0 : 1);

export { shuffle, createDeck, dealCards, starter };
