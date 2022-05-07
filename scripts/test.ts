// import fs from 'fs';
// import path from 'path';

// const getEnterFile = () => {
//   const filePath = path.join(__dirname, '../src/main/preloadScript');
//   const files = fs.readdirSync(filePath);
//   const enter = {};
//   files.forEach((file) => {
//     const info = fs.statSync(path.join(filePath, file));
//     if (info.isDirectory()) {
//       const stat = fs.statSync(path.join(filePath, file, 'index.ts'));
//       if (stat.isFile()) {
//         enter[file] = path.join(filePath, file, 'index.ts');
//       }
//     }
//   });
//
//   return enter;
// };
//
// console.log(getEnterFile());
