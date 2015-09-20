


import json
import signal
import sys
import paho.mqtt.client as mqtt

RASPBERRY_IP_ADDRESS = "192.168.1.10"


class LibsSensors():

    def __init__(self):
        print("initializing")
        # self.client = mqtt.Client()
        # signal.signal(signal.SIGINT, self.signal_handler)
        # self.client.on_connect = self.on_connect
        # self.client.on_message = self.on_message
        # self.client.connect(RASPBERRY_IP_ADDRESS)

    def run(self):
        self.client.loop_forever()

    def signal_handler(self, signal, frame):
        print('terminating')
        self.client.disconnect()


    # The callback for when the client receives a CONNACK response from the server.
    def on_connect(self, client, userdata, rc):
        print("Connected with result code " + str(rc))
        # Subscribing in on_connect() means that if we lose the connection and
        # reconnect then subscriptions will be renewed.

        # this subscribes only to the sfm sensor
        #client.subscribe("sensors/+/sfm/#")
        # this subscribes to all sensors
        client.subscribe("sensors/#")


    # The callback for when a PUBLISH message is received from the server.
    def on_message(client, userdata, msg):
        payload = json.loads(msg.payload)
        print msg.payload



if __name__ == '__main__':

    sensor = LibsSensors()
    client = mqtt.Client()
    signal.signal(signal.SIGINT, sensor.signal_handler)
    self.client.on_connect = self.on_connect
    self.client.on_message = self.on_message
    self.client.connect(RASPBERRY_IP_ADDRESS)

