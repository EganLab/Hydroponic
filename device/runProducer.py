import pika
import sys
import Adafruit_DHT
import time
import datetime

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=sys.argv[1] or 'localhost', port=5672))
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='fanout')

security_code = sys.argv[2]
while True:
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        print("Temp={0:0.1f}C Humidity={1:0.1f}%".format(
            temperature, humidity))
        temperature = str(round(temperature))
        humidity = str(round(humidity))
        created_at = datetime.datetime.now().isoformat()
        message = '{"security_code":"' + security_code + '","data":[{"name":"humidity","data":' + \
            humidity + '},{"name":"temperature","data":' + \
            temperature + '}],"created_at":"' + created_at + '"}'
        channel.basic_publish(
            exchange='logs', routing_key='control', body=message)
        print(" [x] Sent %r" % message)
    else:
        print("Sensor failure. Check wiring.")

    time.sleep(5)

connection.close()
