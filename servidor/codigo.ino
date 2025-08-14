#include <WiFi.h>
#include <HTTPClient.h>


const char *ssid = "PEINE-3";
const char *password = "etecPeine3";
const char *serverName = "http://10.56.13.3:6000/api/sensor";

void setup() {
  Serial.begin(115200);
  delay(10);

  WiFi.begin(ssid, password);
  Serial.println();
  Serial.println();
  Serial.print("Waiting for WiFi... ");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    Serial.flush();
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(500);
}

void loop() {
  int valorS= analogRead(34);
  delay(3000);
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverName);
    http.addHeader("Content-Type", "application/json");

    Serial.println("Enviando dato");
    char jsonStr[100];
    sprintf(jsonStr,"{\"nombre\":\"higrometro\",\"valor\":%d}",valorS );
    int httpResponseCode = http.POST(jsonStr);
    Serial.print("Respuesta: ");
    Serial.println(httpResponseCode);
    http.end();
  } else {
    Serial.println("Desconectado");
  }
}
