import { User } from 'src/apis/User/models/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follow_Info {
  @PrimaryGeneratedColumn('uuid')
  follow_info_id: string;

  @Column()
  follower_info_id: string;

  @Column()
  following_user_id: string;

  @Column()
  create_date: Date;

  @ManyToOne(() => User)
  user: User;
}
