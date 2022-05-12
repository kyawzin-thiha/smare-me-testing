import type { IncomingMessage, ServerResponse } from "http";
import busboy from "busboy";
import { uploadFile } from "../server/services/upload";

export default defineEventHandler(async (event) => {
  const bb = busboy({ headers: event.req.headers });
  bb.on("file", (name, file, info) => {
    console.log('File')
    console.log(info);
    file.on('data', (data) => {
        console.log('running');
    });
  });
  bb.on('close', () => {
    event.res.end();
  })
  bb.on('field', (name, value, info) => {
    console.log('Field')
    console.log(name);
    console.log(value);
    console.log(info);
  })
  event.req.pipe(bb);
  return 'outside'
});
