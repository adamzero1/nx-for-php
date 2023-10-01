
var args = require('process.args')();
args = args[Object.keys(args)[1]]
const glob = require("glob");
const fs = require("fs");
const ignore = require('ignore');
var ig = ignore();
if(fs.existsSync('.gitignore')){
    var gitignoreContents = fs.readFileSync('.gitignore', 'utf-8');
    gitignoreContents.split(/\r?\n/).forEach(line => {
        ig.add(line);
    })
}
var workspaceJson = {
    version: 2,
    projects: {}
};

var configuration = {
    dir: './',
    commands: [
        'test:test'
    ],
    'test:test': 'echo "foo"'
};
if(args.dir){
    configuration.dir = args.dir
    process.chdir(configuration.dir)
}
if(args.commands){
    configuration.commands = args.commands.split(',')
    configuration.commands.forEach(function(val, index){
        if(args[val]){
            configuration[val] = args[val];
        }
    });
}

console.log('Generating workspace.json', {args, configuration});

let paths = glob.sync('**/composer.json');
paths = ig.filter(paths);
paths.forEach(path => {
    var composerJson = JSON.parse(fs.readFileSync(path));
    if(composerJson.name){
        let modulePath = path.replace('composer.json', '');
        let moduleDirectory = modulePath.trim('/').split('/').pop();
        let moduleName = composerJson.name;
        let targets = {};
        configuration.commands.forEach(function(commandId, commandIndex){
            targets[commandId] = {
                command: configuration[commandId]
                .replaceAll('{{ MODULE_PATH }}', modulePath)
                .replaceAll('{{ MODULE_DIRECTORY }}', moduleDirectory)
                .replaceAll('{{ MODULE_NAME }}', moduleName)
            };
        });
        workspaceJson.projects[composerJson.name] = {
            root: path.replace('composer.json', ''),
            sourceRoot: path.replace('/composer.json', ''),
            projectType: composerJson.type? composerJson.type : 'unknown', 
            targets,
            tags: [],
            implicitDependencies: [],
        };
    }
})

console.log('writing to workspace.json');
fs.writeFileSync('workspace.json', JSON.stringify(workspaceJson, null, 2));

process.exit();