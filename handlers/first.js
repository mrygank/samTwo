const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME;

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

    const params = {
        TableName: tableName,
        Item: {
            Id: requestBody.id,
            Name: requestBody.name,
        }
    };

    try {
        await dynamodb.put(params).promise();

        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item inserted successfully' })
        };

        return response;
    } catch (error) {
        console.error('Error inserting item:', error);

        const response = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error inserting item' })
        };

        return response;
    }
};
