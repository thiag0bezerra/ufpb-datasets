//https://web.archive.org/web/20210903155306/https://docs.ckan.org/en/ckan-2.7.3/api/#api-examples

import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

export function add(a: number, b: number): number {
  return a + b;
}


type ResultList = {
  result?: string[]; // replace 'any' with the actual type if known
} & JSON

async function request(query: string): Promise<JSON> {
  const base_url = "https://dadosabertos.ufpb.br/";
  const base_api = "api/3/action";
  const action = join(base_url, base_api, query);
  const result = await fetch(action);
  const json = await result.json();
  return json;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  //console.log("Add 2 + 3 =", add(2, 3));

  const total: { [key: string]: ResultList } = {};
  /*
  Get JSON-formatted lists of a site’s datasets, groups or other CKAN objects:
  http://demo.ckan.org/api/3/action/package_list
  http://demo.ckan.org/api/3/action/group_list
  http://demo.ckan.org/api/3/action/tag_list
  */
  for (
    const query of [
      "package_list",
      "group_list",
      "tag_list",
    ]
  ) {
    //console.log("------------");
    //console.log("Query:", query);
    const json = await request(query);
    total[query] = json;
    //console.log(json);
  }

  /*
  Get a full JSON representation of a dataset, resource or other object:
  http://demo.ckan.org/api/3/action/package_show?id=adur_district_spending
  http://demo.ckan.org/api/3/action/tag_show?id=gold
  http://demo.ckan.org/api/3/action/group_show?id=data-explorer
  

  for (const some_package of total["package_list"].result!) {
    console.log("------------");
    console.log("Package:", some_package);
    const query = `package_show?id=${some_package}`;
    const json = await request(query);
    console.log(json);
  }
    */

  for (const some_group of total["group_list"].result!) {
    console.log("------------");
    console.log("Group:", some_group);
    const query = `group_show?id=${some_group}`;
    const json = await request(query);
    console.log(json);
  }

  for (const some_tag of total["tag_list"].result!) {
    console.log("------------");
    console.log("Tag:", some_tag);
    const query = `tag_show?id=${some_tag}`;
    const json = await request(query);
    console.log(json);
  }

}
