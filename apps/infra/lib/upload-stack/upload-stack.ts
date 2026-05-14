import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UploadStorageConstruct } from './construct/upload-storage-construct';
import { ScanResultMessagingConstruct } from './construct/scan-result-messaging-construct';
import { LocalFakeScannerConstruct } from './construct/fake-scanner-construct';

export class UploadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { incomingBucket } = new UploadStorageConstruct(this, 'UploadStorage');

    const { eventBus } = new ScanResultMessagingConstruct(this, 'ScanResultMessaging');

    new LocalFakeScannerConstruct(this, 'LocalFakeScanner', {
      sourceBucket: incomingBucket,
      eventBus
    });
  }
}
