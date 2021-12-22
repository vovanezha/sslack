const path = require('path');
const fs = require('fs');

const parse = (arguments) => {
    let [nodePath, scriptPath, targetPath = '', indexPath] = arguments;

    const target = path.join(process.cwd(), targetPath);

    if (!indexPath) {
        try {
            const packageJson = fs.readFileSync(path.join(target, 'package.json'), 'utf-8');
            const options = JSON.parse(packageJson);

            indexPath = options.main;
        } catch (error) {
            throw error;
        }
    }

    const index = path.join(process.cwd(), indexPath);

    return {target, index};
}

module.exports = {parse}
