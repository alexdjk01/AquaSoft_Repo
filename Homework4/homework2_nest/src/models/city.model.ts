import { Table, Column, Model, PrimaryKey, AutoIncrement,HasMany  } from 'sequelize-typescript';
import { Hotel } from './hotel.model.js';

@Table({
  tableName: 'Cities',
  timestamps: false,
})
export class City extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  CityID: number;

  @Column
  CityName: string;

  @Column
  Country: string;

  @HasMany(() => Hotel)
  Hotels: Hotel[];

  //maybe a has many airports
}
