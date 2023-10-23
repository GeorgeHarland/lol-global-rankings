import boto3

glue_client = boto3.client('glue')
s3_client = boto3.client('s3')

# try with urls
buckets = s3_client.list_buckets()

for bucket in buckets['Buckets']:
    bucket_name = bucket['Name']

    table_name = 'your_table_name'
    database_name = 'your_database_name'
    s3_path = f's3://{bucket_name}/your_data_path/'
    
    response = glue_client.create_table(
        DatabaseName=database_name,
        TableInput={
            'Name': table_name,
            'StorageDescriptor': {
                'Location': s3_path,
            },
        }
    )
