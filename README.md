* 添加@envIf指令，使用方式：
  ```
  @path = {{$envIf local value1 value2}}

  表示当环境名是local或者当前环境变量里包含local属性的时候，path的值为value1, 否则为value2

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
