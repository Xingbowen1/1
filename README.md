# 个人简历网站

这是一个学术风格的个人简历网站。

## 📋 网站结构

- **左侧栏**：头像、个人简介、联系方式
- **右侧内容**：News、Education、Projects、Skills

## 🚀 使用步骤

### 第一步：查看网站

直接在浏览器中打开 `index.html` 文件即可查看网站效果。

### 第二步：添加你的头像

1. 准备一张你的照片（建议尺寸：400x400 像素，正方形）
2. 将照片命名为 `avatar.jpg`
3. 将照片放到 `assets/img/` 目录下
4. 如果不想使用头像，网站会自动显示占位符

### 第三步：修改个人信息

打开 `index.html` 文件，修改以下内容：

#### 1. 修改邮箱地址

找到这一行：
```html
<a href="mailto:your.email@example.com" class="contact-link">
```

将 `your.email@example.com` 替换为你的实际邮箱地址。

#### 2. 修改个人简介

找到 `<div class="bio">` 部分，修改简介文字。

#### 3. 修改 News 部分

更新你的最新动态。

#### 4. 修改 Education 部分

更新你的教育背景。

#### 5. 修改 Skills 部分

更新你的技能标签。

### 第四步：部署到 GitHub Pages

#### 方法一：使用 GitHub Desktop

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录你的 GitHub 账号
3. 点击 "File" → "Add Local Repository"
4. 选择你的项目文件夹
5. 点击 "Publish repository"
6. 仓库名设置为：`Xingbowen1.github.io`（必须与你的 GitHub 用户名一致）
7. 在 GitHub 网页上，进入仓库设置 → Pages
8. 选择 Source 为 "main" 分支
9. 访问 `https://xingbowen1.github.io` 查看你的网站

#### 方法二：使用命令行

1. 打开终端，进入项目目录
2. 初始化 Git 仓库
3. 添加所有文件并提交
4. 添加远程仓库并推送
5. 在 GitHub 网页上设置 Pages

## 📁 文件结构

```
个人网站/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript 文件（可选）
├── README.md          # 说明文档
└── assets/
    └── img/
        └── avatar.jpg  # 你的头像（需要自己添加）
```

## 🎨 自定义样式

如果你想修改网站的颜色、字体等样式，可以编辑 `styles.css` 文件。

## 📱 响应式设计

网站已经支持响应式设计，在手机、平板和电脑上都能正常显示。

## 🔗 链接说明

- **GitHub 链接**：已设置为 `https://github.com/Xingbowen1`
- **邮箱链接**：需要你手动修改为你的实际邮箱

## ❓ 常见问题

### Q: 头像不显示怎么办？
A: 确保头像文件路径为 `assets/img/avatar.jpg`，或者网站会自动显示占位符。

### Q: 如何添加更多部分？
A: 参考现有的 section 结构，在 `<main class="content">` 中添加新的 `<section>`。

### Q: 如何修改网站标题？
A: 修改 `index.html` 文件中的 `<title>` 标签。

## 📝 许可证

MIT License
