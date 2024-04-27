import { NextApiRequest } from 'next';
import formidable from 'formidable';
import path from 'path';

export const saveFile = (
  req: NextApiRequest,
  prefix: string,
  pathTo: string,
  saveLocally?: boolean
): Promise<{
  fields: formidable.Fields;
  fileNames: string[];
}> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), pathTo);
    options.filename = (name, ext, path) => {
      return `${prefix}` + '-' + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      let fileNames: string[] = [];

      if (Array.isArray(files.files)) {
        files.files.map((file: any) => {
          fileNames.push(`${pathTo}/` + file.newFilename);
        });
      }

      if (Array.isArray(files.image)) {
        files.image.map((file: any) => {
          fileNames.push(`${pathTo}/` + file.newFilename);
        });
      }

      resolve({ fields, fileNames });
    });
  });
};
