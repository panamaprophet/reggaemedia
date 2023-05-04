import { Stack, StackProps, CfnOutput, RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BlockPublicAccess, Bucket, BucketAccessControl, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { UserPool } from 'aws-cdk-lib/aws-cognito';

const BUCKET_NAME = 'reggaemedia_storage';
const ARTICLES_TABLE = 'reggaemedia_articles';
const SETTINGS_TABLE = 'reggaemedia_settings';
const USER_POOL_NAME = 'reggaemedia_pool';


export class ReggaemediaCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket = new Bucket(this, BUCKET_NAME, {
            cors: [
                {
                    allowedMethods: [
                        HttpMethods.GET,
                        HttpMethods.HEAD,
                        HttpMethods.PUT,
                        HttpMethods.POST,
                        HttpMethods.DELETE,
                    ],
                    allowedOrigins: [
                        '*',
                    ],
                    allowedHeaders: [
                        '*',
                    ],
                    exposedHeaders: [
                        'Access-Control-Allow-Origin'
                    ],
                },
            ],
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
                name: 'isPublished',
                type: AttributeType.NUMBER,
            },
            sortKey: {
                name: 'createdOn',
                type: AttributeType.NUMBER,
            },
        });

        articlesTable.addGlobalSecondaryIndex({
            indexName: 'aliasIndex',
            partitionKey: {
                name: 'alias',
                type: AttributeType.STRING,
            },
            sortKey: {
                name: 'createdOn',
                type: AttributeType.NUMBER,
            },
            readCapacity: 1,
            writeCapacity: 1,
        });

        const settingsTable = new Table(this, SETTINGS_TABLE, {
            partitionKey: {
                name: 'key',
                type: AttributeType.STRING,
            },
            removalPolicy: RemovalPolicy.DESTROY,
        });

        const userPool = new UserPool(this, USER_POOL_NAME, {
            userPoolName: USER_POOL_NAME,
            selfSignUpEnabled: false,
            // @todo: consider the using of MFA
            // mfa: Mfa.REQUIRED,
            // mfaMessage: 'Код проверки {####}',
            signInAliases: {
                email: true,
            },
            removalPolicy: RemovalPolicy.DESTROY,
        });

        if (!process.env.COGNITO_CALLBACK_URL) {
            console.log('no cognito callback url provided');

            process.exit(1);
        }

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
                    process.env.COGNITO_CALLBACK_URL,
                ],
            }
        });

        // @todo: consider using of ses to deliver the notifications
        // new CfnEmailIdentity(this, 'root', { emailIdentity: EMAIL_IDENTITY });

        new CfnOutput(this, 'bucket', { value: bucket.bucketName });
        new CfnOutput(this, 'articles', { value: articlesTable.tableName });
        new CfnOutput(this, 'settings', { value: settingsTable.tableName });
        new CfnOutput(this, 'userPoolId', { value: userPool.userPoolId });
        new CfnOutput(this, 'userPoolClientId', { value: userPoolClient.userPoolClientId });
        new CfnOutput(this, 'userPoolClientSecret', { value: String(userPoolClient.userPoolClientSecret.unsafeUnwrap()) });
    }
}
