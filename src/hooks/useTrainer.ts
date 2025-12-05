import { ArenaTrainersUnlock, Card, UserData } from "../App";

export class User implements UserData {
  username: string;
  coins: number;
  collection: Card[];
  battleDeck: Card[];
  arena: ArenaTrainersUnlock[];
  profilePicture?: string;
  isNPC?: boolean;

  constructor(data: Partial<UserData> = {}) {
    this.username = data.username ?? "";
    this.coins = data.coins ?? 0;
    this.collection = data.collection ?? [];
    this.battleDeck = data.battleDeck ?? [];
    this.arena = data.arena ?? [];
    this.profilePicture = data.profilePicture;
    this.isNPC = data.isNPC;
  }

  addCoins(amount: number) {
    this.coins += amount;
  }

  addCardToDeck(card: Card) {
    this.battleDeck.push(card);
  }

  addCardToCollection(card: Card) {
    this.collection.push(card);
  }

  setProfilePicture(pic: string) {
    this.profilePicture = pic;
  }

  toJSON() {
  return {
    username: this.username,
    coins: this.coins,
    collection: this.collection,
    battleDeck: this.battleDeck,
    arena: this.arena,
    profilePicture: this.profilePicture,
    isNPC: this.isNPC
  };
}
}
