import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import randomNumberFrom1To10 from './Utils/randomNumberFrom1To10';

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
    this._strength = randomNumberFrom1To10();
    this._defense = randomNumberFrom1To10();
    this._energy = {
      type_: this._archetype.energyType,
      amount: randomNumberFrom1To10(),
    };
    this._name = name;
    this._dexterity = randomNumberFrom1To10();
    this._race = new Elf(this._name, this._dexterity);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._race.maxLifePoints;
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
    this._maxLifePoints += randomNumberFrom1To10();
    
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
    this._energy.amount = 10;
    this._strength += randomNumberFrom1To10();
    this._defense += randomNumberFrom1To10();
    this._dexterity += randomNumberFrom1To10();
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