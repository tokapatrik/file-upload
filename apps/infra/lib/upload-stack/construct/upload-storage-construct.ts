import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class UploadStorageConstruct extends Construct {
  public readonly incomingBucket: s3.Bucket;
  public readonly uploadBucket: s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.incomingBucket = new s3.Bucket(this, 'IncomingBucket', {
      bucketName: 'incoming'
    });

    this.uploadBucket = new s3.Bucket(this, 'UploadBucket', {
      bucketName: 'upload'
    });
  }
}
