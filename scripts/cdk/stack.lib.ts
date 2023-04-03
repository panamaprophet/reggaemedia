import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ReggaemediaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new cdk.aws_s3.Bucket() storage (images only or audio and video files as well?)

    // new cdk.aws_dynamodb.Table() articles (id, userId, title, ...)
    // new cdk.aws_dynamodb.Table() comments (id, articleId, userId, parentCommentId)
    // new cdk.aws_dynamodb.Table() settings (key, value, updatedBy, updatedOn)

    // new cdk.aws_cognito.UserPool() users (?)

    // cdk.aws_ses.CfnEmailIdentity() identity to use as email send notification
  }
}
