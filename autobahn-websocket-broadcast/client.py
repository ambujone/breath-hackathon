###############################################################################
#
# The MIT License (MIT)
#
# Copyright (c) Tavendo GmbH
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
###############################################################################

import sys
from twisted.internet import reactor
from autobahn.twisted.websocket import WebSocketClientFactory, \
    WebSocketClientProtocol, \
    connectWS

BUFFER = []

###############################################################################
# LIB Sensors
###############################################################################

import json
import signal
import sys
import paho.mqtt.client as mqtt

RASPBERRY_IP_ADDRESS = "192.168.1.10"
WEBSOCKET_URL = "ws://127.0.0.1:9000"

client = mqtt.Client()

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, rc):
    print("Connected with result code " + str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.

    # this subscribes only to the sfm sensor
    #client.subscribe("sensors/+/sfm/#")
    # this subscribes to all sensors
    client.subscribe("sensors/#")


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    global BUFFER
    # payload = json.loads(msg.payload)
    BUFFER.append(msg.payload)
    # print msg.payload



    # sys.stdout.write('{0}, {1}: '.format(msg.topic, payload['timestamp']))
    # for v, u in zip(payload['values'], payload['units']):
    #     sys.stdout.write(u'{0} {1}  '.format(v, u))
    # sys.stdout.write('\n')



###############################################################################

# Threads

import threading
import time

exitFlag = 0


class ThreadLayer(threading.Thread):

    def __init__(self, threadID, name):
        threading.Thread.__init__(self)
        self.stop  = threading.Event()
        self.threadID = threadID
        self.name = name
#       self.buffer_list = []

    def run(self):
        print "\nStarting " + self.name
        if self.name == 'handle_SENSOR_DATA':
            self.handle_SENSOR_DATA()

        elif self.name == 'handle_WEB':
            self.handle_WEB()
        print "\nExiting " + self.name

    def terminate(self):
        print "\nTerminate " + self.name
        if self.name == 'handle_SENSOR_DATA':
            client.disconnect()
        self.stop.set()

    def handle_SENSOR_DATA(self):
        print ('handle_SENSOR_DATA')
        client.on_connect = on_connect
        client.on_message = on_message
        client.connect("192.168.1.10")
        client.loop_forever()

    def handle_WEB(self):
        print ('handle_WEB')
        global BUFFER

        # while not self.stop.wait(2):
        #     if len(BUFFER) > 0:
        #         print('handle_WEB::', BUFFER.pop(0))
        #     # factory = WebSocketClientFactory(WEBSOCKET_URL)
        #     # factory.protocol = BroadcastClientProtocol
        #     # connectWS(factory)
        #     # reactor.run()
        #     print "handle_SENSOR WEB"


###############################################################################


class BroadcastClientProtocol(WebSocketClientProtocol):

    """
    Simple client that connects to a WebSocket server, send a HELLO
    message every 2 seconds and print everything it receives.
    """

    def sendSensorData(self):
        # self.sendMessage("Hello from Paulo!".encode('utf8'))
        global BUFFER
        while len(BUFFER)>0:
            # self.sendMessage("Hello from Paulo!".encode('utf8'))
            data = BUFFER.pop(0)
            self.sendMessage(data.encode('utf8'))
            print ("data sent> %s" % data)


        reactor.callLater(0.2, self.sendSensorData)

    def onOpen(self):
        self.sendSensorData()

    def onMessage(self, payload, isBinary):
        if not isBinary:
            print("Text message received: {}".format(payload.decode('utf8')))



###############################################################################

def main():

    # Create/Start threads
    thread1 = ThreadLayer(1, "handle_SENSOR_DATA")
    thread1.setDaemon(True)
    thread1.start()

    factory = WebSocketClientFactory(WEBSOCKET_URL)
    factory.protocol = BroadcastClientProtocol
    connectWS(factory)
    reactor.run()


    while True:
        n = raw_input("Please enter 'quit' to quit:")
        if n.strip() == 'qt':
            thread1.terminate()
        elif n.strip() == 'st':
            thread1.start()
        elif n.strip() == 'quit':
            thread1.terminate()
            break


if __name__ == '__main__':

    main()

    # if len(sys.argv) < 2:
    #     print("Need the WebSocket server address, i.e. ws://127.0.0.1:9000")
    #     sys.exit(1)

    # factory = WebSocketClientFactory(sys.argv[1])
    # factory.protocol = BroadcastClientProtocol
    # connectWS(factory)


    # reactor.run()

    #SENSOR
    #
    #
    #
    # signal.signal(signal.SIGINT, signal_handler)
    # client.on_connect = on_connect
    # client.on_message = on_message
    # client.connect("192.168.1.10")
    #
    # client.loop_forever()





