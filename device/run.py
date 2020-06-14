import pika
import sys
import Adafruit_DHT
import time
import datetime

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=sys.argv[1:] or 'localhost', port=5672))
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='fanout')

while True:
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        print("Temp={0:0.1f}C Humidity={1:0.1f}%".format(
            temperature, humidity))
    else:
        print("Sensor failure. Check wiring.")
    time.sleep(3)
    created_at = datetime.datetime.now().isoformat()
    message = '{"security_code":"123456","data":[{"name":"humidity","data":${humidity}},{"name":"temperature","data":${temperature}}],"created_at":${created_at}}'
    channel.basic_publish(
        exchange='logs', routing_key='control', body=message)
    print(" [x] Sent %r" % message)

connection.close()
