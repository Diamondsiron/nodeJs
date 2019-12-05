
import Schema from 'async-validator'
const xx = {
    username:[{ required: true, message: "用户名必填" }]
  }
  const schema = new Schema(xx)
  // 校验返回Promise
  schema.validate({'username': 'value'}).then(() => {
    // validation passed or without error message
  }).catch(({ errors, fields }) => {
    console.log(errors)
  })
// 类装饰器
function anotationClass(id){
    console.log('类装饰器来了', id);
    return (target) => console.log('类装饰器', id);
}
// 方法装饰器
function anotationMethods(id){
    console.log('方法装饰器来了', id);
    return (target, property, descriptor) => console.log('方法装饰器', id);
}

@anotationClass(1)
@anotationClass(2)
class Example {
    @anotationMethods(1)
    @anotationMethods(2)
    method(){}
}

// 日志应用和切面实现
console.log('日志应用和切面实现.....')
function logs(target, name, descriptor) {
    console.log(target, name, descriptor)
    const xx = {
        username:[{ required: true, message: "用户名必填" }]
      }
      
    var oldValue = descriptor.value;
    //修改入参
    descriptor.value = function () {
        const schema = new Schema(xx)
        // 校验返回Promise
        schema.validate({'username': 'value'}).then(() => {
            // validation passed or without error message
        }).catch(({ errors, fields }) => {
            console.log(errors)
        })
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, [1,3]);
    }
    return descriptor;
}
var log = (type)=> (rules) => (target, name, descriptor) => {
        var oldValue = descriptor.value;
        //修改入参
        descriptor.value = function () {
            const ctx = arguments[0]
            const data = arguments
            console.log(data,'data')
            const schema = new Schema(rules)
            
            schema.validate(data).then(() => {
                
            }).catch(({ errors }) => {
                console.log('有错误')
                //throw new Error(errors)
            })
            return oldValue.apply(null, arguments);
        }
        return descriptor;
    }


class Maths {
    @log('body')({
        username:[{ required: true, message: "用户名必填" }]
    })
    say(username){
        console.log(username)
    }

    add(a, b) {
        console.log(a,b)
        return a + b;
    }
}
const math = new Maths()
math.add(2, 4)
math.say({username:'abc'});


let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
console.log(strLength,'strLength')
//接口
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
  
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

//泛型 不确定是什么类型 使用的时候再把类型穿进去
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString"); 
console.log(output,'output')

//代理模式
import "reflect-metadata";

class Point {
    x: number;
    y: number;
}

class Line {
    private _p0: Point;
    private _p1: Point;

    @validate
    set p0(value: Point) { this._p0 = value; }
    get p0() { return this._p0; }

    @validate
    set p1(value: Point) { this._p1 = value; }
    get p1() { return this._p1; }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set;
    descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.");
        }
        set(value);
    }
}

