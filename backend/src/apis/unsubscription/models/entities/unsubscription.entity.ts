import { Subscription } from 'src/apis/subscription/models/entities/subscription.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Unsubscription {
  @PrimaryGeneratedColumn('uuid')
  unsubsc_id: string;

  @Column()
  refund_date: Date;

  @Column()
  refund_complete_date: Date;

  @JoinColumn()
  @OneToOne(() => Subscription)
  subscription: Subscription;
}
