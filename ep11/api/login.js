import formidable from "formidable";

export default function handler(request, response) {
    const form = new formidable.IncomingForm();
    form.parse(request, (err, fields, files) => {
        console.log("parse result", {
            err,
            fields,
            files,
        });
        response.status(200).send(`
        <h1>Hello world</h1>
        <p>hi</p>
        `);
    });
}
