#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

#define DHTTYPE DHT11
#define DHTPIN 2

#define N_QUANTITIES 2

ESP8266WiFiMulti WiFiMulti;
const char* SSID = "Tenda";
const char* PASSWORD = "pRpatil@7225";
HTTPClient http;

DHT dht(DHTPIN, DHTTYPE, 11);

struct SensorData {
  int id;
  char* sensor;
  char* load;
  char* quantity;
  float value;
};
SensorData sensor_data[N_QUANTITIES];

float humidity, temperature;

void setup() {
  Serial.begin(115200);
  dht.begin();
  connect_to_AP(SSID, PASSWORD);
}

void loop() {
  humidity = read_humidity();
  delay(500);
  temperature = read_temperature();
  float readings[N_QUANTITIES] = {humidity, temperature};
  format_data(readings, N_QUANTITIES);
  JsonArray& json_data = generate_json(sensor_data, N_QUANTITIES);
  send_post_request(json_data); 
  delay(1000);
}

void connect_to_AP(const char* ssid, const char* password) {
  WiFiMulti.addAP(ssid, password);
  Serial.println("Wait for WiFi ...");
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);  
  }
  Serial.println("WiFi Connected !!!");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());
  delay(500);  
}

int read_humidity() {
  float reading = dht.readHumidity();
  return reading;  
}

int read_temperature() {
  float reading = dht.readTemperature();
  return reading;  
}

void format_data(float readings[], int n) {
  SensorData obj;
  char* sensors[N_QUANTITIES] = {"DHT11", "DHT11"};
  char* loads[N_QUANTITIES] = {"-", "-"};
  char* quantities[N_QUANTITIES] = {"humidity", "temperature"};
  for (int i = 0; i < n; i++) {
    obj.id = 1;
    obj.sensor = sensors[i];
    obj.load = loads[i];
    obj.quantity = quantities[i];
    obj.value = readings[i];
    sensor_data[i] = obj;   
  }
}

void send_post_request(JsonArray& payload) {
  char buffer[1500];
  payload.printTo(buffer, sizeof(buffer));
///  Serial.println("[HTTP] begin...");
  http.begin("http://192.168.0.102/1");
  http.addHeader("Content-Type", "application/json");
  http.POST(buffer);
//  http.writeToStream(&Serial);
  http.end();
}

JsonArray& generate_json(SensorData arr[], int n) {
  const size_t buffer_size = JSON_ARRAY_SIZE(N_QUANTITIES) + JSON_OBJECT_SIZE(5) + 150;
  StaticJsonBuffer<buffer_size> json_buffer;
  JsonArray& root = json_buffer.createArray();
  for (int i = 0; i < n; i++) {
    JsonObject& sensor_obj = root.createNestedObject();
    sensor_obj["id"] = arr[i].id;
    sensor_obj["sensor"] = arr[i].sensor;
    sensor_obj["quantity"] = arr[i].quantity;
    sensor_obj["load"] = arr[i].load;
    sensor_obj["value"] = arr[i].value;  
  }
  return root;
}


