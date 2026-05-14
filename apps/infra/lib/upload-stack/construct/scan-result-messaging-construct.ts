import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';

export class ScanResultMessagingConstruct extends Construct {
  public readonly scanResultQueue: sqs.Queue;
  public readonly eventBus: events.IEventBus;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.eventBus = events.EventBus.fromEventBusName(this, 'DefaultEventBus', 'default');

    this.scanResultQueue = new sqs.Queue(this, 'ScanResultQueue', {
      queueName: 'GuardDutyScanResultsQueue'
    });

    new events.Rule(this, 'GuardDutyScanResultRule', {
      eventBus: this.eventBus,
      eventPattern: {
        source: ['aws.guardduty'],
        detailType: ['GuardDuty Malware Protection Object Scan Result']
      },
      targets: [new targets.SqsQueue(this.scanResultQueue)]
    });
  }
}
