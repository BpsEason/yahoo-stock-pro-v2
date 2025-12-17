# 📘 Yahoo Stock Pro v2  
**React + Tailwind + PHP API + Docker 的股票查詢工具**

Yahoo Stock Pro v2 是一個簡單易用的股票查詢應用程式，前端使用 **React + TailwindCSS**，後端使用 **PHP** 透過 Yahoo Finance API 取得即時股價，並以 **Docker Compose** 一鍵啟動整套環境。

適合想快速了解：

- 如何用 PHP 呼叫 Yahoo Finance API  
- 如何用 React + Tailwind 建立簡單 UI  
- 如何用 Docker 部署前後端分離專案  

---

## 🚀 功能介紹

- 查詢全球股票（例如：`2330.TW`、`AAPL`、`MSFT`）
- 顯示：
  - 即時價格
  - 昨收價
  - 漲跌金額
  - 漲跌百分比
  - 幣別
- 深色系 UI，使用 TailwindCSS
- 前後端完全分離
- Docker 一鍵啟動

---

## 📁 專案結構

```
yahoo-stock-pro-v2/
│
├── backend/
│   ├── api.php          # PHP API，呼叫 Yahoo Finance
│   └── Dockerfile       # PHP + Apache
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── Dockerfile       # React build + Nginx
│   └── src/
│       ├── App.jsx
│       └── main.jsx
│
└── docker-compose.yml   # 一鍵啟動前後端
```

---

## 🐳 使用 Docker 啟動

### 1️⃣ 建置並啟動

```bash
docker-compose up --build
```

### 2️⃣ 開啟瀏覽器

| 服務 | URL |
|------|------|
| 前端 React | http://localhost:5173 |
| 後端 API | http://localhost:8000/api.php?symbol=2330.TW |

---

## 🧩 API 使用方式

### GET `/api.php?symbol=2330.TW`

成功回傳：

```json
{
  "symbol": "2330.TW",
  "name": "2330.TW",
  "price": 789,
  "prevClose": 780,
  "change": 9,
  "percent": "1.15%",
  "currency": "TWD"
}
```

錯誤回傳：

```json
{
  "error": "查無資料，請確認代號（如：AAPL, 2330.TW）"
}
```

---

## 🛠 技術棧

### 前端
- React 18
- TailwindCSS（CDN）
- Vite
- Nginx（部署）

### 後端
- PHP 8.2
- Yahoo Finance Chart API
- Apache（部署）

### 部署
- Docker
- Docker Compose

---

## 🔧 如何修改前端

前端程式位於：

```
frontend/src/
```

主要檔案：

- `App.jsx`：主要 UI 與 API 呼叫邏輯
- `main.jsx`：React 入口

修改後重新 build：

```bash
docker-compose build frontend
docker-compose up
```

---

## 🔧 如何修改後端

後端 API 位於：

```
backend/api.php
```

你可以：

- 修改 Yahoo API 呼叫方式
- 增加更多欄位
- 加入快取或錯誤處理

修改後重新啟動：

```bash
docker-compose build backend
docker-compose up
```

---

## 📜 授權

本專案僅供學習用途，請遵守 Yahoo Finance API 使用規範。

---
