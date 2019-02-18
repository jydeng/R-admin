const fs = require("fs");
const path = require("path");
const resolve = file => path.resolve(__dirname, file);

const Koa = require("koa");
const koaStatic = require("koa-static");
const port = 3000;
const app = new Koa();

const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve("../src/index.template.html"), "utf-8"),
  clientManifest: clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}

app.use(koaStatic(resolve("../dist")));

app.use(async ctx => {
  const context = {
    title: "Vue-Admin",
    url: ctx.url
  };
  const html = await renderToString(context);
  ctx.body = html;
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
