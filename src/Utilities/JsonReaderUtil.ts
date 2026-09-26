
import fs from 'fs';

export class JsonReaderUtil{

    static readJson(filepath : string) : Record<string,string>[]
{

    return JSON.parse(fs.readFileSync(filepath,'utf-8'));
}

}