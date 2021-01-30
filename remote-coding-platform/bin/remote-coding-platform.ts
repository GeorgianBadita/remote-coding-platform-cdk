#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RemoteCodingPlatformStack } from '../lib/remote-coding-platform-stack';

const app = new cdk.App();
new RemoteCodingPlatformStack(app, 'RemoteCodingPlatformStack');
