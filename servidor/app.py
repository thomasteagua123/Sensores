from flask import Flask, request
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/sensor/", methods=['POST'])
def sensor():
    datos = request.json
    sensor=datos["nombre"]
    valor=datos["valor"]
    print(f"Sensor: ",sensor, "valor:" ,valor,)
    return "OK"