# recruitment_task_tjekvik
Automated Test Project

# Quick guide how to set up recruitment_task_project

## Initial steps
* Clone the project from GitHub: https://github.com/adizg/recruitment_task_tjekvik
* Install TestCafe globally using a command:
* Run cmd shell and go to e2e directory .\recruitment_task_tjekvik\e2e
* Call a single command to run a test script:
`testcafe test-script.js`

## Test structure explanation
* e2e – main folder, where you can find test script file: test-script.js and config file: .testcaferc.json;  
* helpers – created to execute data-driven tests, data.json consists of two input values: carLicensePlateNumber, question, customerGroup, firstAnswer and secondAnswer, each object represents one iteration;  
* pages – page model including elements of the pages and common operations.    

## Settings description in .testcaferc.json
"browsers": ["chrome"], **browser in which tests should be executed**  
"concurrency": 1, **number of browser instances**  
"skipJsErrors": true,  **java script errors are ignored during test run**  
"path": "reports/screenshots/", **base directory of screenshots**  
"takeOnFails": **true screenshots are taken whenever a test fails**  
"reporter": **used to output test runs**   
"name": "json", **specifies report name, here I used default built-in reporter** 
"output": "reports/report_file.json" **path to the report file**  

# Acceptance Criteria and Test scripts
## Acceptance Criteria  
### Scenario 1  
#### Given
As a non-waiting customer I want to pick up my car before 16:00
#### And
“Kundergruppe” is selected as Fleet
#### When 
I select option “I would like to pick up my car before 16:00 ”on a page just before the parking image page 
#### And
I click “Weiter” button
#### Then
Parking image page is displayed successfully  
  
### Scenario 2  
#### Given
As a non-waiting customer I can pick up my car when it’s ready
#### And
“Kundergruppe” is selected as Fleet
#### When 
I select option “I have no plans for today, please call me when my car is ready” on a page just before the parking image page 
#### And
I click “Weiter” button
#### Then
Parking image page is displayed successfully  

## Test Input  
**Source**: https://hackmd.io/@tjekvik/qa-task  
**Prerequisites**:  
Question and 2 answers have been created based on the following template:  
  
When do you want to collect your car keys?  
* I would like to pick up my car before 16:00.
* I have no plans for today, please call me when my car is ready.

## Test Script 1
*Title:* As a non-waiting customer with registration number ${data.registrationNumber} (Customer group: ${data.customerGroup}) I want to pick up car before 16:00.  
*Starting page:* https://daimler-shop-terminal1.tjekvik-staging.com/kiosk/car_service  
*Steps:* 
1. Maximize browser window
2. Click "Check In" button
3. Click "Anmelden mit Kennzeichen" button
4. Enter registration number and click Start Check-In
5. Skip Contact page
6. Accept decalaration for marketing purposes
7. Skip Agreements page
8. Check if question + 2 answer exist on the Answer page
9. Confirm your choice and navigate back to the Answer page to verify that correct answer has been checked

**Expected final result:**  
Question: "When do you want to collect your car keys? " and the first anwser: "I would like to pick up my car before 16:00." are visible and the first anwser radio button is checked. 

## Test Script 2
*Title:* As a non-waiting customer with registration number ${data.registrationNumber} (Customer group: ${data.customerGroup}) I can pick up car whenever it's ready.  
*Starting page:* https://daimler-shop-terminal1.tjekvik-staging.com/kiosk/car_service  
*Steps:*  
1. Maximize browser window
2. Click "Check In" button
3. Click "Anmelden mit Kennzeichen" button
4. Enter registration number and click Start Check-In
5. Skip Contact page
6. Accept decalaration for marketing purposes
7. Skip Agreements page
8. Check if question + 2 answer exist on the Answer page
9. Confirm your choice and navigate back to the Answer page to verify that correct answer has been checked

**Expected final result:**  
Question: "When do you want to collect your car keys? " and the second anwser: "I have no plans for today, please call me when my car is ready." are visible and the second anwser radio button is checked. 
