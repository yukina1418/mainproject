// # date {
//     #     match => ["updateat","YYYY-MM-dd HH:mm:ss:SS"]
//     #     timezone => "Asia/Seoul"
//     #     target => "updateat"
//     #     }
// #    if[tagid] mutate{
// #        split => ["tagid","?"]
// #        add_field => {"postTags" => "%{[tagid][0]} : %{[tagname][0]}" }
// # ruby{
// #     add_field => {"postTags" => "%{tagid}"}
// # }
// # mutate{
// #     add_field => {"postTags" => "%{tagid}"}

// # }
// #     }
// # filter {
//     #      if "IMP" in [log][file][path] {
//     #      mutate { remove_field => ["@version"] }
//     #      data { match => {"[imp][updataat]", "YYYY-MM-dd H:m:s" }, target => "@timestamp", timezone=>"Asia/Seoul" }
//     #      }
//     # }
// add_field => {"postTagsArr" => {"%{tagid}" : "object"}}
