#!/bin/sh

if [ ! -f /data/.initialized ]; then
    
    until curl -s http://localhost:9000/minio/health/ready; do
        sleep 1
    done
  
    mc alias set local http://localhost:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD
    mc mb local/repair-shop-images
    mc mb local/repair-images
    mc event add local/repair-shop-images arn:minio:sqs::RabbitMq:amqp --event put
    mc event add local/repair-images arn:minio:sqs::RabbitMq:amqp --event put
    
    touch /data/.initialized
fi