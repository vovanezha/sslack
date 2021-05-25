function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export default function copyFile() {
  return {
    name: 'iife-page',
    renderChunk: async (code, chuckInfo) => {
      const pageName = capitalize(chuckInfo.name);

      const exportCode = `export default ${pageName};`;
      const initCode = `new ${pageName}({target: document.body, hydrate: true});`;

      return code.replace(exportCode, initCode);
    },
  };
}
