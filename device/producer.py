#!/usr/bin/env python

import pika
import sys

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost', port=5672))
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='fanout')

message = ' '.join(
    sys.argv[1:]) or '{"security_code":"123456","data":[{"name":"humidity","data":42},{"name":"temperature","data":34}],"created_at":"2020-06-12T16:48:21.908Z"}'
channel.basic_publish(exchange='logs', routing_key='control', body=message)
print(" [x] Sent %r" % message)
connection.close()
