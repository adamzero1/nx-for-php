
const fs = require("fs");

const REFERENCES_PATH='nx/var/references.json';
const WORKSPACE_PATH='workspace.json';

var dependant = process.argv[2];
var dependency = process.argv[3];
console.log('Checking why %s depends on %s', dependant, dependency);


if(!fs.existsSync(REFERENCES_PATH)){
    console.log('references not generated');
    process.exit(1);
}
references = JSON.parse(fs.readFileSync(REFERENCES_PATH).toString());

if(!fs.existsSync(WORKSPACE_PATH)){
    console.log('workspace not generated');
    process.exit(1);
}
workspace = JSON.parse(fs.readFileSync(WORKSPACE_PATH).toString());

// TODO - check these exist
var dependantProjectConfig = workspace.projects[dependant];

let dependantSourceRoot = './'+dependantProjectConfig.sourceRoot+'/';
for (filePath in references) {
    if(filePath.startsWith(dependantSourceRoot)){
        for(var i=0; i<references[filePath].length; i++){
            if(references[filePath][i].module == dependency){
                console.log('%s requires %s', filePath, references[filePath][i].class);
            }
        }
    }
}
process.exit(0);

