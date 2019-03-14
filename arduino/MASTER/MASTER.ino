#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

bool alarmArmed;
const char* ssid = "HUAWEI";
const char* password = "11111111";
char dataTempHum[11];
LiquidCrystal_I2C lcd(0x27,16,2); 

byte thermometer[8] = 
{
    B00100,
    B01010,
    B01010,
    B01110,
    B01110,
    B11111,
    B11111,
    B01110
};
byte droplet[8] = 
{
    B00100,
    B00100,
    B01010,
    B01010,
    B10001,
    B10001,
    B10001,
    B01110,
};

void setup () {

    pinMode(D7,INPUT);
    Wire.begin(D2,D1); 

  lcd.init();                       
  lcd.createChar(1,thermometer);
  lcd.createChar(2,droplet);
  
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("INITIALIZATION");
  delay(500);
  lcd.begin(16, 2);
  lcd.setCursor(0, 0); 
  lcd.print("Network:"); 
  lcd.setCursor(0, 1); 
  lcd.print(ssid); 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
 
    delay(1000);  
    lcd.clear();
    lcd.print("Connecting..");
  }  
  lcd.clear();

}

unsigned long nowTime = 0;
unsigned long checkAlarmTime = 0;
unsigned long checkMeasurementsTime = 0;
unsigned long sendDataTime = 0;
String response = "";

void loop() 
{
  if(pulseIn(D7, HIGH) > 0)
  {
    String token = loginPOSTrequestApi();
    alarmArmed = setAlarmInAPI(token, alarmArmed);  
  }
  nowTime = millis();
  
  if(nowTime - checkMeasurementsTime  >= 3000UL)
  {
    response="";
    checkMeasurementsTime = nowTime;
    Wire.requestFrom(3, 11);
     while(Wire.available())
     {
        char c = Wire.read();
        response += c;
     }
        printTempHumOnLCD(response);
        printAlarmStatus(alarmArmed);
  
  }   
  if(nowTime - sendDataTime >= 1200000UL)
  {
      sendDataTime = nowTime;
      String token = loginPOSTrequestApi();
      sendValuesPOSTrequestApi(token, response);
  }
  
  if(nowTime - checkAlarmTime >= 300UL)
  {
    checkAlarmTime = nowTime;
    alarmArmed = setAlarm();
  }
}

String parseValuesToJSON(String rawData)
{
  String JSON = "";

  JSON += "{";
  JSON += "\"temperature\":";
  JSON += rawData[0];
  JSON += rawData[1];
  JSON += ",";
  JSON += "\"humidity\":";
  JSON += rawData[6];
  JSON += rawData[7];
  JSON += "}";
  return JSON;
}

void sendValuesPOSTrequestApi(String token, String dataToPost)
{
  HTTPClient http;
  String postData = parseValuesToJSON(dataToPost);
  
  http.begin("http://sleepy-garden-23787.herokuapp.com/api/data");            
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + token);
  int httpCode = http.POST(postData);
  Serial.println(httpCode);
  
  http.end();
}

String loginPOSTrequestApi()
{
   HTTPClient http;    //Declare object of class HTTPClient

  String postData;
  String login = "test@test";
  String password = "test";
 
  //Post Data
  postData = "email=" + login + "&password=" + password;
  
  http.begin("http://sleepy-garden-23787.herokuapp.com/api/auth/login");            
  http.addHeader("Content-Type", "application/x-www-form-urlencoded"); 
 
  int httpCode = http.POST(postData);   //Send the request
  String payload = http.getString();    //Get the response payload
  
  http.end();  //Close connection

  int payloadLength = payload.length();
  String token = payload.substring(10,181);
  return token;
}
void printTempHumOnLCD(String response)
{
  String temperature, humidity, alarm;
  for(int i = 0; i < 5; i++)
  {
    temperature += response[i];
  }

  for(int i = 6; i < 11; i++)
  {
    humidity += response[i];
  }
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.write(1);
  lcd.print(temperature);
  lcd.print((char)223);
  lcd.print("C|");
  lcd.setCursor(0, 1);
  lcd.write(2);
  lcd.print(humidity);
  lcd.print("% |");
  lcd.noBlink();
}


bool setAlarmInAPI(String token, bool alarmStatus)
{
  if(alarmStatus)
  {
    HTTPClient http;
    
    http.begin("http://sleepy-garden-23787.herokuapp.com/api/alarm/disable");            
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + token);
    int httpCode = http.POST("");
    Serial.println(httpCode);
    http.end();  
    }
  else
  {
    HTTPClient http;
    
    http.begin("http://sleepy-garden-23787.herokuapp.com/api/alarm/enable");            
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + token);
    int httpCode = http.POST("");
    Serial.println(httpCode);
    http.end();  
  }

  return !alarmStatus;
}

int requestGETapiAlarm()
{ 
  String payload;
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin("http://sleepy-garden-23787.herokuapp.com/api/alarm/short"); 
    int httpCode = http.GET();                                                                  //Send the request
 
    if (httpCode > 0) { //Check the returning code
 
      payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload
    }
 
    http.end();   //Close connection
    return payload.toInt();
  }
}

int setAlarm()
{
  int alarmStatus = requestGETapiAlarm();
  Wire.beginTransmission(3); 
  Wire.write(alarmStatus);        
  Wire.endTransmission();
  return alarmStatus;    
}

void printAlarmStatus(int alarmStatus)
{
  lcd.setCursor(9, 0);
  lcd.print("ALARM:");
  lcd.setCursor(9,1);
  if(alarmStatus == 1)
  {
    lcd.print("ARMED");
  }
  else
  {
    lcd.print("UNARMED");
  }
}
