const{test,expect}=require('@playwright/test');


test('passind data',async ({page})=>{

await page.goto("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");
await page.locator("//summary[normalize-space()='Table Data']").click();

const jsonData=[{"name" : "Bob", "age" : 20, "gender": "male"}, {"name": "George", "age" : 42, "gender": "male"}, {"name":
"Sara", "age" : 42, "gender": "female"}, {"name": "Conor", "age" : 40, "gender": "male"}, {"name":
"Jennifer", "age" : 42, "gender": "female"}];

const jsonString = JSON.stringify(jsonData);


await page.waitForTimeout(3000);

await page.locator('#jsondata').fill(jsonString);
await page.waitForTimeout(5000);
await page.locator("//button[@id='refreshtable']").click();
await page.waitForTimeout(5000);

const actualData = await page.$$eval('table tr', rows => {
  return rows.map(row => {
    const [name, age, gender] = Array.from(row.children).map(cell => cell.textContent.trim());
    return { name, age: parseInt(age), gender };
  });
});
const expectedData = JSON.parse(jsonData);
expect(actualData).toEqual(expectedData);
 });



     