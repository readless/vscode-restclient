* 添加@jsonStrFromFile指令，使用方式：
  ```
  @content = {{$jsonStrFromFile filePath}}   
  则会读取filePath路径对应的文件内容，转为json字符串，已自动进行json转义，filePath可以是绝对路径或相对路径
  举例：有些请求体的字段是json字符串，则json字符串里的引号等需要转义。使用此指令会自动读取文件内容并转义，最终返回的字符串前后已添加引号。
  ```
* 变量支持按目录配置文件查找，即先查找当前目录的 @var.conf 文件是否存在该变量定义，不存在则递归寻找上级目录，直到项目根路径目录。变量优先级： 当前文件变量 > 目录配置变量 > 环境变量。
* 借助目录变量，可以将当前目录下所有http文件公共的变量定义放到@var.conf文件里定义。（命名为 @var.conf 可使该文件始终处于目录文件列表第一位）

* 添加@envIf指令，使用方式：
  ```
  @path = {{$envIf local value1 value2}}

  表示当环境名是local或者当前环境变量里包含local属性的时候，path的值为value1, 否则为value2，对于需要表达空格的，请考虑用 / 代替，url里写多个 / 无碍

  举例：开发环境请求路径是api1, 而测试环境则是 api2, 那么可以通过$envIf的方式把这种差异写在当前http文件里，不需要写到环境变量里
  ```

* 支持日期格式（/Date(1312312312313)XXX/）自动解释为可读日期格式

* 如果响应报文为json，且json中某字段(可以在任意层级)的值为json字符串，则会自动将该字符串展开为对象  
  ```
  {"key": "{\"a\": 1}"} 
  会转化为 
  {"key": {"a": 1}} 
  如果想禁用此功能，设置rest-client.expandJsonStrAsJsonObject 为false
  ```
