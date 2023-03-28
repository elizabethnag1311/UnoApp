export enum CardFamily {
  Regular = 'colores',
  Special = 'especiales',
}
export enum CardType {
  Numbers = 'numeros',
  Skip = 'saltar',
  Reverse = 'reversa',
  TakeTwo = 'toma_dos',
  ChangeColor = 'cambio_color',
  TakeFourChangeColor = 'toma_cuatro_cambio_color',
}
export enum CardColor {
  Red = 'rojo',
  Yellow = 'amarillo',
  Green = 'verde',
  Blue = 'azul',
}

export interface ICard {
  family: CardFamily;
  type: CardType;
  color?: CardColor;
  value?: string;
}

export class Card {
  cartasJuegoUno!: ICard[];

  constructor(public color: string, public value: string) {}
}
