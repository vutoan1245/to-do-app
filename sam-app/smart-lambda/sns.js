const AWS = require('aws-sdk');
const sns = new AWS.SNS({region: 'us-east-1', apiVersion: '2010-03-31'})

exports.handler = (event, context, callback) => {
    
    const params = {
        Message: "Just a test", 
        Subject: "Test SNS From Lambda",
        TopicArn: "arn:aws:sns:us-east-1:584257970499:smart-registration"
    };
    sns.publish(params, context.done);

    const publishTextPromise = sns.publish(params).promise();

    publishTextPromise.then((err, data) => {
        if (err) console.log(err);
        else console.log("MessageId: " + data.MessageId);
    }).catch((err) => {
        console.log("Error: " + err);
    })

};
