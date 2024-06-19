import { parse } from "jsr:@std/csv";

async function format_csv_files(source: string, dest: string) {
    const text = await Deno.readTextFileSync(
        source,
    );
    const json = parse(text, {
        skipFirstRow: true,
        strip: true,
        separator: ";",
    });

    Deno.writeTextFileSync(
        dest,
        JSON.stringify(json, null, 2),
    );
}

if (import.meta.main) {
    //read all csv in oficial/ folder
    const files = Deno.readDirSync("oficial/");
    for (const file of files) {
        console.log(file.name);
        await format_csv_files(
            `oficial/${file.name}`,
            `formatted/${file.name.replaceAll(".csv", ".json")}`
        );
    
    }

}
