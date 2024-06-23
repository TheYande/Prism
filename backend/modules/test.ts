import { DB } from "./databases.js";

const db1 = new DB<{
    cheese:string,
    a:string[]
}>("db1")

await db1.setData("test",{cheese:"test string",a:["among us"]})
console.log(await db1.getData("test"))

