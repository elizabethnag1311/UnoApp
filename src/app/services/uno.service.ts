import { Injectable } from '@angular/core';
import {
  Card,
  CardColor,
  CardFamily,
  CardType,
  ICard,
} from '../model/inventario.model';
import cardDatabase from '../model/card-database.json';

@Injectable({
  providedIn: 'root',
})
export class UNOService {
  private cards: ICard[] = [];
  cardDatabase = cardDatabase;

  constructor() {}

  buildCardDeck(): ICard[] {
    const colors = this.cardDatabase.colores;
    const specials = this.cardDatabase.especiales;

    colors.forEach((colorObject, index) => {
      for (let i = 0; i < 2; i++) {
        colorObject.numeros.forEach((numero) => {
          if (numero !== '0') {
            this.cards.push({
              family: CardFamily.Regular,
              type: CardType.Numbers,
              color: colorObject.color as CardColor,
              value: numero,
            });
          } else if (numero === '0' && i === 0) {
            this.cards.push({
              family: CardFamily.Regular,
              type: CardType.Numbers,
              color: colorObject.color as CardColor,
              value: numero,
            });
          }
        });
      }

      const skipCount = colorObject[CardType.Skip];
      for (let i = 0; i < skipCount; i++) {
        this.cards.push({
          family: CardFamily.Special,
          type: CardType.Skip,
          color: colorObject.color as CardColor,
        });
      }

      const reverseCount = colorObject[CardType.Reverse];
      for (let i = 0; i < reverseCount; i++) {
        this.cards.push({
          family: CardFamily.Special,
          type: CardType.Reverse,
          color: colorObject.color as CardColor,
        });
      }

      const takeTwoCount = colorObject[CardType.TakeTwo];
      for (let i = 0; i < takeTwoCount; i++) {
        this.cards.push({
          family: CardFamily.Special,
          type: CardType.TakeTwo,
          color: colorObject.color as CardColor,
        });
      }
    });

    specials.forEach((specialObject, index) => {
      if (specialObject[CardType.ChangeColor]) {
        const changeColorCount = specialObject[CardType.ChangeColor];
        for (let i = 0; i < changeColorCount!; i++) {
          this.cards.push({
            family: CardFamily.Special,
            type: CardType.ChangeColor,
          });
        }
      } else {
        const takeFourChangeColorCount =
          specialObject[CardType.TakeFourChangeColor];
        for (let i = 0; i < takeFourChangeColorCount!; i++) {
          this.cards.push({
            family: CardFamily.Special,
            type: CardType.TakeFourChangeColor,
          });
        }
      }
    });
    return this.cards;
  }

  getCards(): ICard[] {
    return this.cards;
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  dealCards(): {
    playerCards: ICard[];
    drawCard: ICard;
  } {
    const playerCards: ICard[] = [];
    for (let i = 0; i < 7; i++) {
      playerCards.push(this.cards.pop()!);
    }
    const drawCard = this.cards.pop()!;
    return { playerCards, drawCard };
  }
}
