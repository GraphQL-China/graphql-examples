# About
本项目起因于QQ群讨论：为了方便初学者熟悉基础工具的用法而建立。
# ignore
本项目顶级目录暂时不设置`.gitignore`文件，请在PR内附带对应example的`.gitignore`文件。
# Schema
本项目通过最基本的`CRUD`展示`GraphQL`用法，假定为"博文+作者+评论"组成的博客场景，`basic-schema.graphql`文件仅作为参考，请自行按需拓展或者变更：
1. 参考的schema的分页是根据`relay`增强规范设置的`cursor-based`，对于实施可能有些不便，你可以改做`offset-based`
1. 添加`update`和`delete`类的`mutation`
1. 添加基本的鉴权功能
# Structure
目录按照`语言/平台/框架-库-特性`来组织，例如`js/backend/koa2-apollo-server-ssr`。
# Contribute
如果你发现任何有问题，可发起PR进行修复。另希望在对应的example下写下`README`，陈述一下主要实现的内容。

PR将在得到两个及以上approval后merge。
