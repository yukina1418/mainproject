import { Food_Type } from 'src/apis/food_type/models/entities/food_type.entity';
import { User } from 'src/apis/User/models/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite_Food {
  @PrimaryGeneratedColumn('uuid')
  fav_food_id: string;

  @Column()
  create_date: Date;

  @ManyToOne(() => Food_Type)
  food_Type: Food_Type;

  @ManyToOne(() => User)
  user: User;
}
