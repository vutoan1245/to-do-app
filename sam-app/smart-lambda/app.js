const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});
const cloudformation = new AWS.CloudFormation({region: 'us-east-1', apiVersion: '2010-05-15'});
const sns = new AWS.SNS({region: 'us-east-1', apiVersion: '2010-03-31'});
const fs = require('fs');

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body);
    
    fs.readFile('./ec2.yaml', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const cloudformationParams = {
                StackName: data.Company + '-ec2-from-lambda',
                Capabilities: ['CAPABILITY_IAM'],
                TemplateBody: data
            };
    
            cloudformation.createStack(cloudformationParams, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
        
                    // Send SNS message to confirm
                    const params = {
                        Message: "An EC2 instance has successfully launched. Company: " + data.Company, 
                        Subject: "Message from lambda",
                        TopicArn: process.env.TopicARN
                    };
                
                    sns.publish(params, (err, data) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("MessageId: " + data.MessageId);
                        }
                    });
                }
            });
        } 
        
    });
    
    const dynamodbParams = {
        Item: {
            "Email": {
                S: data.Email
            },
            "First Name": {
                S: data.FirstName
            },
            "Last Name": {
                S: data.LastName
            },
            "Company": {
                S: data.Company
            },
            "Address": {
                S: data.Address
            },
            "City": {
                S: data.City
            },
            "State": {
                S: data.State
            },
            "Zip Code": {
                S: data.ZipCode
            },
            "Phone": {
                S: data.Phone
            }
        },
        TableName: process.env.TABLE_NAME
    };

    dynamodb.putItem(dynamodbParams, function(err, data) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log(data);
            callback(null, data);
        }
    });
     
};