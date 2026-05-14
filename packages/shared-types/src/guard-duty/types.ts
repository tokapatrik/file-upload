export const GUARD_DUTY_MALWARE_SCAN_SOURCE = 'aws.guardduty' as const;

export const GUARD_DUTY_MALWARE_SCAN_DETAIL_TYPE =
  'GuardDuty Malware Protection Object Scan Result' as const;

export type GuardDutyMalwareScanStatus = 'COMPLETED' | 'SKIPPED' | 'FAILED';

export const GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES = {
  NO_THREATS_FOUND: 'NO_THREATS_FOUND',
  THREATS_FOUND: 'THREATS_FOUND',
  UNSUPPORTED: 'UNSUPPORTED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  FAILED: 'FAILED'
} as const;

export type GuardDutyMalwareScanResultStatus =
  (typeof GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES)[keyof typeof GUARD_DUTY_MALWARE_SCAN_RESULT_STATUSES];

export type GuardDutyMalwareThreat = {
  name: string;
};

export type GuardDutyMalwareScanResultDetail = {
  schemaVersion: '1.0';
  scanStatus: GuardDutyMalwareScanStatus;
  resourceType: 'S3_OBJECT';
  s3ObjectDetails: {
    bucketName: string;
    objectKey: string;
    eTag?: string;
    versionId?: string;
    s3Throttled: boolean;
  };
  scanResultDetails: {
    scanResultStatus: GuardDutyMalwareScanResultStatus;
    threats: GuardDutyMalwareThreat[] | null;
    statusReasons: string[] | null;
  };
};

export type GuardDutyMalwareScanResultEvent = {
  version: '0';
  id: string;
  'detail-type': typeof GUARD_DUTY_MALWARE_SCAN_DETAIL_TYPE;
  source: typeof GUARD_DUTY_MALWARE_SCAN_SOURCE;
  account: string;
  time: string;
  region: string;
  resources: string[];
  detail: GuardDutyMalwareScanResultDetail;
};
