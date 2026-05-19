import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { MalwareScanStatus, UploadStatus } from '../constants/upload-status.constant';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_name: string;

  @Column()
  content_type: string;

  @Column()
  size: number;

  @Column({
    type: 'enum',
    enum: UploadStatus,
    default: UploadStatus.PENDING
  })
  status: UploadStatus;

  @Column({
    type: 'enum',
    enum: MalwareScanStatus,
    default: MalwareScanStatus.NOT_STARTED
  })
  scan_status: MalwareScanStatus;

  @Column()
  presigned_url_expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
