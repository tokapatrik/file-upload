import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import {
  GUARD_DUTY_MALWARE_SCAN_DETAIL_TYPE,
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES,
  GUARD_DUTY_MALWARE_SCAN_SOURCE,
  type GuardDutyMalwareScanResultDetail,
  type GuardDutyMalwareScanResultStatus
} from '@file-upload/shared-types/guard-duty';
import { S3Handler } from 'aws-lambda';

const eventBridge = new EventBridgeClient({});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const GUARD_DUTY_MALWARE_SCAN_SUCCESS_RESULT_STATUSES: GuardDutyMalwareScanResultStatus[] = [
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES.NO_THREATS_FOUND
];

const GUARD_DUTY_MALWARE_SCAN_FAILURE_RESULT_STATUSES: GuardDutyMalwareScanResultStatus[] = [
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES.THREATS_FOUND,
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES.UNSUPPORTED,
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES.ACCESS_DENIED,
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES.FAILED
];

const GUARD_DUTY_MALWARE_SCAN_RESULT_STATUS_POOL: GuardDutyMalwareScanResultStatus[] = [
  ...GUARD_DUTY_MALWARE_SCAN_SUCCESS_RESULT_STATUSES,
  ...GUARD_DUTY_MALWARE_SCAN_FAILURE_RESULT_STATUSES,
  ...GUARD_DUTY_MALWARE_SCAN_FAILURE_RESULT_STATUSES,
  ...GUARD_DUTY_MALWARE_SCAN_FAILURE_RESULT_STATUSES
];

const getFakeScanResultStatus = (): GuardDutyMalwareScanResultStatus =>
  GUARD_DUTY_MALWARE_SCAN_RESULT_STATUS_POOL[
    Math.floor(Math.random() * GUARD_DUTY_MALWARE_SCAN_RESULT_STATUS_POOL.length)
  ]!;

export const handler: S3Handler = async (event) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const bucketName = record.s3.bucket.name;
      const objectKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

      await sleep(3000 + Math.floor(Math.random() * 2000));

      const detail: GuardDutyMalwareScanResultDetail = {
        schemaVersion: '1.0',
        scanStatus: 'COMPLETED',
        resourceType: 'S3_OBJECT',
        s3ObjectDetails: {
          bucketName,
          objectKey,
          s3Throttled: false
        },
        scanResultDetails: {
          scanResultStatus: getFakeScanResultStatus(),
          threats: null,
          statusReasons: null
        }
      };

      await eventBridge.send(
        new PutEventsCommand({
          Entries: [
            {
              EventBusName: process.env.EVENT_BUS_NAME ?? 'default',
              Source: GUARD_DUTY_MALWARE_SCAN_SOURCE,
              DetailType: GUARD_DUTY_MALWARE_SCAN_DETAIL_TYPE,
              Detail: JSON.stringify(detail)
            }
          ]
        })
      );
    })
  );
};
