import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food_Type {
  @PrimaryGeneratedColumn('uuid')
  food_type_id: string;

  @Column()
  foor_type_name: string;
}
