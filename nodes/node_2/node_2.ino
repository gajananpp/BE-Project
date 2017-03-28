#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define N_QUANTITIES 1

#define FSR_PIN A0

ESP8266WiFiMulti WiFiMulti;
const char* SSID = "Tenda";
const char* PASSWORD = "pRpatil@7225";
HTTPClient http;

struct SensorData {
  int id;
  char* sensor;
  char* load;
  char* quantity;
  float value;
};
SensorData sensor_data[N_QUANTITIES];

long force;
int motor_pin1 = 13; 
int motor_pin2 = 15;

void setup() {
  Serial.begin(115200);
  connect_to_AP(SSID, PASSWORD);
  pinMode(motor_pin1, OUTPUT);
  pinMode(motor_pin2, OUTPUT);
  digitalWrite(motor_pin1, HIGH);
  digitalWrite(motor_pin2, LOW);
}

void loop() {
  force = get_force();
  checkThreshold();
  float readings[N_QUANTITIES] = {force};
  format_data(readings, N_QUANTITIES);
  JsonArray& json_data = generate_json(sensor_data, N_QUANTITIES);
  send_post_request(json_data); 
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

float get_force() {
  int fsrReading = analogRead(FSR_PIN);
  int fsrVoltage = map(fsrReading, 0, 1023, 0, 3300);
  unsigned long fsrResistance = 3300 - fsrVoltage;
  fsrResistance *= 10000;
  fsrResistance /= fsrVoltage;
  unsigned long fsrConductance = 1000000;
  fsrConductance /= fsrResistance;
  long fsrForce = 0;
  if (fsrConductance <= 1000) {
    fsrForce = fsrConductance/80;  
  } else {
    fsrForce = fsrConductance - 1000;
    fsrForce /= 30;  
  }
  return fsrForce;
}

void format_data(float readings[], int n) {
  SensorData obj;
  char* sensors[N_QUANTITIES] = {"FSR"};
  char* loads[N_QUANTITIES] = {"Motor"};
  char* quantities[N_QUANTITIES] = {"force"};
  for (int i = 0; i < n; i++) {
    obj.id = 2;
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
  Serial.println("[HTTP] begin...");
  http.begin("http://192.168.0.102/2");
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(buffer);
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString();
      Serial.println(response);  
    }
  }
  http.writeToStream(&Serial);
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

void checkThreshold() {
    if (force >= 20) {
      digitalWrite(motor_pin1, LOW);  
    } else {
      digitalWrite(motor_pin1, HIGH);  
    }
}
