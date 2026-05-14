import { Duration, aws_s3 as s3 } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as events from 'aws-cdk-lib/aws-events';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';
import * as path from 'path';

type LocalFakeScannerConstructProps = {
  sourceBucket: s3.IBucket;
  eventBus: events.IEventBus;
};

export class LocalFakeScannerConstruct extends Construct {
  constructor(scope: Construct, id: string, props: LocalFakeScannerConstructProps) {
    super(scope, id);

    const fakeScanner = new NodejsFunction(this, 'FakeScannerFunction', {
      entry: path.join(__dirname, '../../../lambdas/fake-scanner/handler.ts'),
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(10),
      environment: {
        EVENT_BUS_NAME: props.eventBus.eventBusName
      }
    });

    props.eventBus.grantPutEventsTo(fakeScanner);

    props.sourceBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new LambdaDestination(fakeScanner)
    );
  }
}
