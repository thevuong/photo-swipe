import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter directory path: ', (directoryPath) => {
  // Chuyển đổi đường dẫn tương đối thành tuyệt đối
  const absolutePath = path.resolve(process.cwd(), directoryPath);

  console.log(`Renaming files in: ${absolutePath}`);

  // Đối với mỗi tệp tin trong thư mục cần đổi tên
  renameFilesInDirectory(absolutePath);

  rl.close();
});

// Đổi tên tất cả các tệp tin trong một thư mục
function renameFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      throw err;
    }

    // Đối với mỗi tệp tin trong thư mục
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Kiểm tra xem tệp tin là một thư mục hay không
      fs.stat(filePath, (err, stat) => {
        if (err) {
          throw err;
        }
        if (stat.isDirectory()) {
          // Đệ quy để xử lý tất cả các thư mục con
          renameFilesInDirectory(filePath);
        } else {
          // Đổi tên tệp tin có đuôi .js sang .ts
          if (path.extname(filePath) === '.js') {
            const newFilePath = path.join(directoryPath, `${path.basename(file, '.js')}.ts`);
            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                throw err;
              }
              console.log(`Renamed ${filePath} to ${newFilePath}`);
            });
          }
        }
      });
    });
  });
}
