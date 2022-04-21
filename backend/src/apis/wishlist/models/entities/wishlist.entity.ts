import { Post } from 'src/apis/post/models/entities/post.entity';
import { User } from 'src/apis/User/models/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WishList {
  @PrimaryGeneratedColumn('uuid')
  wishlist_id: string;

  @Column()
  create_date: Date;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => User)
  user: User;
}
