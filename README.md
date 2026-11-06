# 文存 · 文章素材库

一个开箱即用的 Markdown 文章素材库：左侧是分类目录，首页是站点介绍与文章流，文章支持 Markdown、自动生成目录、代码高亮和深浅色主题。

内容用 GitHub PR 提交：PR 会自动生成 Cloudflare Pages 预览部署；合并到 `main` 后自动构建并发布到生产域名。

仓库地址：<https://github.com/liangbinchen2013/my-article>

## 技术栈

- [Astro 7](https://astro.build/)：静态站点 + Markdown 内容集合
- Shiki：双主题代码高亮
- KaTeX：Markdown 中的 LaTeX 数学公式
- Cloudflare Pages Git 集成：推送自动构建，PR 自动预览，`main` 自动部署

## 本地开发

需要 Node.js >= 22.23.4（推荐 24 LTS）。

```bash
git clone https://github.com/liangbinchen2013/my-article.git
cd my-article
npm install
npm run dev       # http://localhost:4321
npm run check     # 类型 / 内容 schema 检查
npm run build     # 产物在 dist/
npm run preview   # 预览构建结果
```

## 如何更新文章

所有文章都是 `src/content/posts/` 下的 Markdown 文件，一篇 `.md` 对应一篇文章。更新文章只需要新增、修改或删除这里的文件，然后提交 PR；合并到 `main` 后会自动重新构建并部署。

### 新增文章

1. 在 `src/content/posts/` 新建 `.md` 文件，**文件名就是文章 URL**：
   - `my-first-essay.md` → `/posts/my-first-essay/`
   - 建议使用英文小写 + 连字符，例如 `reading-notes-2026.md`。
   - 发布后尽量不要改文件名，否则文章 URL 会变化。
2. 文件开头按下面的格式填写 frontmatter：

```markdown
---
title: 文章标题
description: 一句话摘要，会显示在文章列表和页面描述中
category: exam-essays
pubDate: 2026-11-06
updatedDate: 2026-11-06   # 可选，修改文章时更新
draft: false              # 可选，true 时不会出现在站内
---

正文从这里开始，支持完整的 Markdown 语法。
```

3. 正文使用 `##` / `###` 会自动生成右侧目录（窄屏显示在文章开头）。
4. 图片放在 `public/images/` 下，正文里用绝对路径引用：

```markdown
![图片描述](/images/example.jpg)
```

5. 正文支持 LaTeX 数学公式，由 KaTeX 在构建时渲染：
   - 行内公式：`$E = mc^2$`
   - 独立公式：

   ```markdown
   $$
   \int_0^1 x^2 \, dx = \frac{1}{3}
   $$
   ```

6. 文章按 `pubDate` 倒序排列，首页按年份分组；首页的总字数、分类计数都会自动重新计算，不需要手动维护。

### 修改文章

- 在 `src/content/posts/` 找到对应 `.md` 文件直接编辑。
- 内容有更新的，建议同时更新 frontmatter 里的 `updatedDate`，文章页会显示「更新于」。
- 不要随意修改文件名，保持原 URL 稳定。
- 提交 PR，合并到 `main` 后线上自动更新。

### 删除文章

- 删除 `src/content/posts/` 下对应的 `.md` 文件。
- 合并到 `main` 后，文章会从首页、分类页和统计中消失，原 URL 会返回 404。
- 如果只是暂时不想展示，可以把 `draft` 改成 `true`，效果同样是线上不可见。
- `src/content/posts/.gitkeep` 只是用来保留空目录，不要删除，也不要把它当成文章。

### 分类

当前分类在 `src/data/categories.ts` 中定义：

| slug | 名称 | 说明 |
| --- | --- | --- |
| `exam-essays` | 考场范文 | 考场作文与范文，记录认真书写的每一次练习 |

文章的 `category` 必须填写上表中的 slug，填错会导致 CI 构建失败。

新增分类时，在 `src/data/categories.ts` 的数组里加一项：

```ts
{
  slug: 'notes',
  name: '笔记',
  description: '一句分类说明',
}
```

侧边栏和分类页会自动同步，不需要改页面代码。

### 发布到线上（PR → 自动部署）

**推荐：直接在 GitHub 网页操作**

- **新增**：打开仓库的 `src/content/posts/` → **Add file → Create new file** → 输入文件名和内容 → 选择「Create a new branch for this commit and start a pull request」→ 提交 PR。
- **修改**：打开要修改的 `.md` 文件 → 右上角铅笔图标 → 编辑后创建新分支并提交 PR。
- **删除**：打开文件 → 右上角垃圾桶图标 → 提交 PR。
- 提交 PR 后，Cloudflare Pages 会自动为这个 PR 构建预览部署，预览链接会出现在 PR 的检查记录和 Cloudflare 项目里。
- 合并到 `main` 后，Cloudflare Pages 自动构建生产部署，自定义域名随之更新。

**本地操作**

```bash
git clone https://github.com/liangbinchen2013/my-article.git
cd my-article
git checkout -b article/my-update

# 在这里新增 / 修改 / 删除 src/content/posts/ 下的 Markdown

npm run check
npm run build
git add src/content/posts
git commit -m "content: add my new essay"
git push -u origin article/my-update
```

推送后在 GitHub 创建 PR，检查通过并合并即可。合并前也可以本地 `npm run dev` 预览效果。

> PR 阶段只会生成预览部署，不影响生产域名；生产环境只在合并到 `main` 后更新。

## 修改站点信息

- 站点名称、副标题、首页介绍、GitHub 仓库地址：`src/config.ts`
- 分类名称与描述：`src/data/categories.ts`
- 配色、字体、间距：`src/styles/global.css` 顶部的 CSS 变量

## Cloudflare Pages 部署配置（首次）

本项目使用 **Cloudflare Pages 的 Git 集成**：Cloudflare 直接连接 GitHub 仓库，推送后自动安装依赖、构建并部署。不需要 GitHub Actions，也不需要本地手动上传。

### 1. 连接 GitHub 仓库

Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，选择 `liangbinchen2013/my-article`。

构建配置：

| 配置项 | 值 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 留空 |

环境变量：

| 变量 | 值 |
| --- | --- |
| `NODE_VERSION` | `24` |

> 构建输出目录必须是 `dist`，生产分支必须是 `main`。这两项配错时，Cloudflare 可能显示构建成功，但访问站点是 404。

### 2. 自定义域名（可选）

Cloudflare Dashboard → 你的 Pages 项目 → Custom domains → Set up a custom domain。域名托管在 Cloudflare 时，DNS 记录会自动配置。

### 3. 部署流程

- 提交 PR：Cloudflare 自动构建预览部署，预览链接会出现在 PR 检查记录中。
- 合并到 `main`：Cloudflare 自动构建生产部署，自定义域名同步更新。
- 查看构建状态和日志：Dashboard → Workers & Pages → 你的项目 → Deployments。

## 目录结构

```text
.github/
  PULL_REQUEST_TEMPLATE.md
public/
  favicon.svg
  _headers                  # Cloudflare Pages 安全 / 缓存响应头
  robots.txt
src/
  components/               # 侧边栏、文章列表、文章卡片、目录、主题切换
  content/posts/            # 所有 Markdown 文章（.gitkeep 仅用于保留空目录）
  data/categories.ts        # 分类定义
  layouts/BaseLayout.astro  # 全站骨架、主题与移动端抽屉
  lib/posts.ts              # 排序、分组、阅读时长、日期格式化
  pages/
    index.astro             # 首页：站点介绍 + 全部文章
    categories/[slug].astro # 分类文章页
    posts/[slug].astro      # 文章详情（含目录、上一篇/下一篇）
    404.astro
  styles/global.css
  config.ts                 # 站点文案与信息
  content.config.ts         # 文章 frontmatter schema（zod）
astro.config.mjs
```

## 常见问题

**Cloudflare 构建失败，提示分类不在允许列表**
`category` 只能填 `src/data/categories.ts` 中已有的 slug（当前为 `exam-essays`）。

**Cloudflare 显示构建成功，但访问站点是 404**
检查 Pages 项目的 Build output directory 是否为 `dist`、Production branch 是否为 `main`；再确认最新部署是 Production 部署，而不是只有 Preview 部署。

**新增、修改或删除文章后，线上没有变化**
PR 阶段只生成预览部署，生产环境只在合并到 `main` 后更新。合并后到 Cloudflare Dashboard → 项目 → Deployments 查看构建是否成功；如果失败，打开该次部署的日志查看原因。

**首页总字数需要手动改吗**
不需要。每次构建时会自动统计所有已发布文章（不含 `draft: true`）的字数，并更新首页统计。

本项目固定使用 Cloudflare Pages 的 Git 集成部署，不需要 GitHub Actions，也不要在本地用 Wrangler 重复上传。

**图片放在哪里**
`public/images/`，引用路径以 `/images/` 开头。Astro 会把 `public/` 原样复制到构建产物中。

**日期显示不对**
`pubDate` 按 UTC 解析并以 UTC 格式化，写法用 `YYYY-MM-DD` 即可，不会因构建机器时区漂移。
