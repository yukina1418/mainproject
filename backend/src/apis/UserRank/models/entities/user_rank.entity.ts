import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User_Rank {
  @PrimaryGeneratedColumn('uuid')
  user_rank_id: string;
  @Column()
  rank_name: string;
}
