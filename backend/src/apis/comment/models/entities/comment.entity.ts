import { Post } from 'src/apis/post/models/entities/post.entity';
import { User } from 'src/apis/User/models/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column()
  contents: string;

  @Column()
  like_count: number;

  @Column()
  create_date: Date;

  @Column()
  update_date: Date;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => User)
  user: User;
}
