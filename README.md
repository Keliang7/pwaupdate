# 项目代码风格与文件管理配置

## 1. 文件嵌套（File Nesting）
**用途**：在 VS Code 中将关联文件（如配置文件）折叠到主文件下，保持目录整洁。  
**示例**：将 `.editorconfig`、`.prettierrc` 等折叠到 `package.json` 中显示。

### 配置方式
在 `.vscode/settings.json` 中添加：
```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "package.json": ".editorconfig, .prettierrc.json, eslint.config.js, pnpm-lock.yaml"
  }
}
```

## 2. `.editorconfig` 详细配置
**用途**：统一基础代码风格（缩进、换行、编码等），解决跨编辑器/操作系统差异。

### 配置文件示例（`.editorconfig`）
```ini
# 声明为根配置，停止向上搜索
root = true

# 所有文件的默认规则
[*]
charset = utf-8          # 文件编码
indent_style = space     # 缩进类型：空格
indent_size = 2          # 缩进大小：2 空格
end_of_line = lf         # 换行符：LF（推荐跨平台）
insert_final_newline = true  # 文件末尾保留空行
trim_trailing_whitespace = true  # 删除行尾空格

# 针对特定文件的规则
[*.{js,ts,jsx,tsx}]      # JavaScript/TypeScript 文件
indent_size = 2

[*.json]                 # JSON 文件
indent_size = 2

[*.md]                   # Markdown 文件
trim_trailing_whitespace = false  # 保留行尾空格（避免破坏格式）
```

### 核心配置项说明
| 配置项 | 常用值 | 作用 |
|--------|--------|------|
| `indent_style` | `space/tab` | 缩进类型（空格或制表符） |
| `indent_size` | `2, 4` | 缩进空格数（若用 tab 则无效） |
| `end_of_line` | `lf/crlf` | 换行符（推荐 `lf` 跨平台） |
| `charset` | `utf-8` | 文件编码 |
| `trim_trailing_whitespace` | `true/false` | 是否删除行尾空格 |

## 3. 与其他工具的协作
### 与 Prettier
- `.editorconfig`：管理基础格式（缩进、换行）。
- `Prettier`：管理高级风格（引号、分号等）。
- **优先级**：若冲突，Prettier 默认优先（可通过 `useEditorConfig: false` 禁用）。

### 与 ESLint
- `ESLint`：检查代码逻辑错误（如未使用变量）。
- **无冲突**：二者职责分离。

## 4. 验证配置生效
### 编辑器支持：
- **VS Code**：安装 `EditorConfig` 插件（新版默认支持）。
- **WebStorm/IDEA**：原生支持。

### 命令行检查：
```bash
npm install -g editorconfig-checker
editorconfig-checker
```
**提示**：将 `.editorconfig` 文件置于项目根目录，确保所有子目录生效。

