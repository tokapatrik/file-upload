import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class UploadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new cdk.aws_s3.Bucket(this, 'IncomingFilesBucket', {
      bucketName: 'incoming-files-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}
