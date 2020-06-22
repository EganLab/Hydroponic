#!/usr/bin/env python
import pika
import sys
import json
import RPi.GPIO as GPIO
import hashlib

PumpPIN = 14  # Pump
LampPIN = 15  # Lamp
GPIO.setmode(GPIO.BCM)  # Use physical pin numbering

# Set pin to be an output pin and set initial value to low (off)
GPIO.setup(PumpPIN, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(LampPIN, GPIO.OUT, initial=GPIO.LOW)

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=sys.argv[1] or 'localhost', port=5672))
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='fanout')

str2hash = sys.argv[2]
result = hashlib.md5(str2hash.encode())
result = channel.queue_declare(queue=result.hexdigest(), exclusive=True)
queue_name = result.method.queue

channel.queue_bind(exchange='logs', queue=queue_name)

print(' [*] Waiting for logs. To exit press CTRL+C')


def callback(ch, method, properties, body):
    # bytes to string
    body = body.decode("utf-8")
    actuator = json.loads(body)
    if actuator["name"] == "Pump":
        if actuator["status"] == True:
            GPIO.output(PumpPIN, GPIO.HIGH)
        else:
            GPIO.output(PumpPIN, GPIO.LOW)

    elif actuator["name"] == "Lamp":
        if actuator["status"] == True:
            GPIO.output(LampPIN, GPIO.HIGH)
        else:
            GPIO.output(LampPIN, GPIO.LOW)


channel.basic_consume(
    queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
