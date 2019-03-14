#include <DHT.h>
#include <Wire.h>

#define DHT11_PIN 12
#define TRIG 6
#define ECHO 4
#define PIEZO 8
#define BUTTON 3
#define YELLOW_LED 2

DHT dht;
bool alarmArmed;
bool objectDetected;
void setup()
{
  pinMode(PIEZO, OUTPUT); 
  pinMode(TRIG, OUTPUT); 
  pinMode(ECHO, INPUT);   
  pinMode(BUTTON, INPUT); 
  attachInterrupt(digitalPinToInterrupt(3), NULL, RISING);

  alarmArmed = false;
  objectDetected = false;
  Serial.begin(9600);
  Wire.begin(3); 
  dht.setup(DHT11_PIN);
  Wire.onReceive(receiveHandler);
  Wire.onRequest(requestHandler);
}

double temperature;
double humidity;
char response[11];

unsigned long nowTime = 0;
unsigned long measuresTime = 0;
unsigned long lookForObjectTime = 0;


void loop()
{
    if(pulseIn(BUTTON, HIGH) > 0)
  {
    objectDetected = false;
  }
  if(alarmArmed)
  {
    digitalWrite(YELLOW_LED, HIGH);
  }
  else
  {
    digitalWrite(YELLOW_LED, LOW);
  }
  
  nowTime = millis();
  if(nowTime - measuresTime >= 2100UL)
  {
    measuresTime = nowTime;
    temperature = dht.getTemperature();
    humidity = dht.getHumidity();
    if(temperature > 0 && humidity > 0)
    {
      String responseTmp = "";
      responseTmp += (String)temperature;
      responseTmp += "|";
      responseTmp += (String)humidity;
      for(int i = 0; i < 11; i++)
      {
        response[i] = responseTmp[i];
      }
    }
  }

  if(nowTime - lookForObjectTime >=500UL)
  {
    lookForObjectTime = nowTime;
  
    if(alarmArmed && !objectDetected)
    {
      objectDetected = lookForObject();
    }
  }
  if(objectDetected)
  {
        tone(8, 1000, 300);
        delay(100);
        tone(8, 500, 300);
        delay(100);
        tone(8, 1000, 300);
        delay(100);
        tone(8, 500, 300);
        delay(100);
  }

}

bool lookForObject()
{
  long _time, distance;
 
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
 
  _time = pulseIn(ECHO, HIGH);
  distance = _time / 58;
  Serial.println(distance);
  if(distance <= 7)
  {
    return true;
  }
  else
  {
    return false;
  }
}

void requestHandler()
{
  Wire.write(response);
}

void receiveHandler()
{
  int value = Wire.read();
  if(value == 1) 
  {
    alarmArmed = true;
  }
  else
  {
    alarmArmed = false;
  }
}
