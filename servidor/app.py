import sqlite3
from flask import Flask, g, request, jsonify


def dict_factory(cursor, row):
 """Arma un diccionario con los valores de la fila."""
 fields = [column[0] for column in cursor.description]
 return {key: value for key, value in zip(fields, row)}


def abrirConexion():
  if 'db' not in g:
     g.db = sqlite3.connect("sensores.sqlite")
     g.db.row_factory = dict_factory
  return g.db


def cerrarConexion(e=None):
   db = g.pop('db', None)
   if db is not None:
       db.close()

app = Flask(__name__)
app.teardown_appcontext(cerrarConexion)
resultados_por_pag = 10

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/sensor/", methods=['POST'])
def sensor():
    datos = request.json
    db = abrirConexion()
    Sensor=datos["nombre"]
    Valor=datos["valor"]
    print(f"Sensor: ",Sensor, "valor:" ,Valor,)
    db.execute("INSERT INTO valores(nombre, valor) VALUES(?, ?)", (Sensor, Valor))
    db.commit()
    cerrarConexion()
    respuesta = {"respuesta" : "ok"}
    return jsonify(respuesta)