import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  board_id: string;

  @Column()
  board_name: string;

  @Column()
  create_data: Date;
}
