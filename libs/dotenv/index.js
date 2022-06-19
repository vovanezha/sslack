const fs = require('fs');

module.exports = {
  parse(options = {}) {
    const filepath = options.path || '.env';
    const content = fs.readFileSync(filepath, 'utf-8');

    const lines = content.split('\n').filter(Boolean);
    const parsed = {};

    lines.forEach(line => {
      const [key, value] = line.split('=');

      if (key !== undefined && value !== undefined) {
        parsed[key] = value;
      }
    });

    Object.assign(process.env, parsed);

    return parsed;
  }
};
