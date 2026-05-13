import { App } from 'aws-cdk-lib';
import { UploadStack } from '../lib/upload-stack';

const app = new App();

new UploadStack(app, 'UploadStack', {});
