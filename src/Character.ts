import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  public _name: string;

  constructor(name: string) {
    this._archetype = new Mage(name);
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(this._name, this._dexterity);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get archetype(): Archetype { 
    return this._archetype;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  get name(): string {
    return this._name;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get race(): Race {
    return this._race;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  special(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
    enemy.receiveDamage(this._strength);
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    // const lifePlus = getRandomInt(1, 10);
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;

    // if (this._maxLifePoints + lifePlus > this._race.maxLifePoints) {
    //   this._maxLifePoints = this._race.maxLifePoints;
    //   this._lifePoints = this._maxLifePoints;
    // } else {
    //   this._maxLifePoints += lifePlus;
    //   this._lifePoints = this._maxLifePoints;
    // }

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
      this._lifePoints = this._maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }
}