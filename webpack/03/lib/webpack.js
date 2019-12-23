const fs = require("fs")
const path = require("path")
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const {transformFromAst} = require("@babel/core")
class Webpack {
    constructor(options){
        const { entry, output } = options
        this.entry = entry;
        this.output = output;
        this.modules = []
    }

    run() {
        const info = this.parse(this.entry)
        this.modules.push(info)
        //查找所有依赖
        for (let i = 0; i < this.modules.length;i++){
            const item = this.modules[i]
            const {dependencies} = item
            if(dependencies){
                for(let j in dependencies){
                    this.modules.push(this.parse(dependencies[j]))
                }
            }
        }
        console.log(this.modules)
        const obj = {}
        this.modules.forEach(item=>{
            obj[item.entryFile] = {
                dependencies:item.dependencies,
                code:item.code
            }
        })
        this.file(obj)
        
    }

    parse(entryFile) {
        const content = fs.readFileSync(entryFile,"utf-8")
        //console.log("入口文件",content)
        const ast = parser.parse(content,{
            sourceType:"module"
        })
        //console.log(ast.program.body)
        const dependencies = {}
        traverse(ast,{
            ImportDeclaration({node}){
                const newPathName = "./"+path.join(path.dirname(entryFile),node.source.value);
                dependencies[node.source.value] = newPathName
            }
        })
        //console.log("依赖路径",dependencies)
        const { code } = transformFromAst(ast,null,{
            presets:["@babel/preset-env"]
        })
        //console.log("code",code)

        return {
            entryFile,
            dependencies,
            code
        }
    }

    file(code) {
        const filePath = path.join(this.output.path, this.output.filename);
        const newCode = JSON.stringify(code);
        const bundle = `(function(graph){
            function require(module){
                function reRequire(relativePath){
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(reRequire,exports,graph[module].code)
                return exports
            }
            require("${this.entry}")
        })(${newCode})`
        fs.writeFileSync(filePath, bundle, "utf-8")
    }
}

module.exports = Webpack