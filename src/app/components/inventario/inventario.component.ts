import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/model/inventario.model';
import { UNOService } from "../../services/uno.service";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  cards!: ICard[];
  playerCards: ICard[] = [];
  drawCard!: ICard;

  constructor( private unoService: UNOService) { }

  ngOnInit(): void {
    this.cards = this.unoService.buildCardDeck();
    console.log(this.cards);
  }

  shuffle() {
    this.unoService.shuffle();
    this.cards = this.unoService.getCards();
    console.log('shuffled cards', this.cards);
  }

  dealCards() {
    const { playerCards, drawCard } = this.unoService.dealCards();
    this.playerCards = playerCards;
    this.drawCard = drawCard;
  }

}
