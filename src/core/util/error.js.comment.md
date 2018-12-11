只定义了 `handleError(err, vm, info)` 一个函数。主要用于处理和输出错误信息。

如果 vm 实例不为空，则会依次向 vm 实例的父级执行 `errorCaptured` 错误处理函数。