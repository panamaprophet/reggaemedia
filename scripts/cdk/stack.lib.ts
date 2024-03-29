import { Stack, StackProps, CfnOutput, RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BlockPublicAccess, Bucket, BucketAccessControl, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { UserPool } from 'aws-cdk-lib/aws-cognito';

const BUCKET_NAME = 'reggaemedia_storage';
const ARTICLES_TABLE = 'reggaemedia_articles';
const USER_POOL_NAME = 'reggaemedia_pool';

const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
const hostname = process.env.NODE_ENV === 'production' ? process.env.HOSTNAME : 'localhost:3000';

const COGNITO_CALLBACK_URL = `${protocol}${hostname}/api/auth/callback/cognito`;

export class ReggaemediaCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket = new Bucket(this, BUCKET_NAME, {
            cors: [{
                allowedMethods: [
                    HttpMethods.GET,
                    HttpMethods.HEAD,
                    HttpMethods.PUT,
                    HttpMethods.POST,
                    HttpMethods.DELETE,
                ],
                allowedOrigins: ['*'],
                allowedHeaders: ['*'],
                exposedHeaders: ['Access-Control-Allow-Origin'],
            }],
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
            blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
            accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL
        });

        bucket.addToResourcePolicy(
            new PolicyStatement({
                sid: 'Allow All',
                effect: Effect.ALLOW,
                principals: [new AnyPrincipal()],
                actions: [
                    's3:GetObject',
                    's3:ListBucket',
                    's3:PutObject',
                ],
                resources: [
                    bucket.bucketArn,
                    bucket.arnForObjects('*'),
                ],
            })
        );

        const articlesTable = new Table(this, ARTICLES_TABLE, {
            partitionKey: {
                name: 'id',
                type: AttributeType.STRING,
            },
            removalPolicy: RemovalPolicy.DESTROY,
        });

        articlesTable.addGlobalSecondaryIndex({
            indexName: 'publishedIndex',
            partitionKey: {
                name: 'publishedOn',
                type: AttributeType.NUMBER,
            },
            sortKey: {
                name: 'createdOn',
                type: AttributeType.NUMBER,
            },
        });

        const userPool = new UserPool(this, USER_POOL_NAME, {
            userPoolName: USER_POOL_NAME,
            selfSignUpEnabled: false,
            signInAliases: {
                email: true,
            },
            removalPolicy: RemovalPolicy.DESTROY,
        });

        const userPoolClient = userPool.addClient('client', {
            generateSecret: true,
            accessTokenValidity: Duration.minutes(60),
            authFlows: {
                adminUserPassword: true,
            },
            oAuth: {
                flows: {
                    authorizationCodeGrant: true,
                },
                callbackUrls: [
                    COGNITO_CALLBACK_URL,
                ],
            }
        });

        new CfnOutput(this, 'bucket', { value: bucket.bucketName });
        new CfnOutput(this, 'tableArticles', { value: articlesTable.tableName });
        new CfnOutput(this, 'cognitoUserPoolId', { value: userPool.userPoolId });
        new CfnOutput(this, 'cognitoClientId', { value: userPoolClient.userPoolClientId });
        new CfnOutput(this, 'cognitoClientSecret', { value: String(userPoolClient.userPoolClientSecret.unsafeUnwrap()) });
        new CfnOutput(this, 'cognitoCallbackUrl', { value: COGNITO_CALLBACK_URL });
    }
}
