import { sqlite } from ".";

const query = sqlite.prepare("SELECT * FROM tags");
console.log(query.all());
