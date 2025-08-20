# HW_GULP 33

Мій навчальний проєкт на Gulp з підтримкою SCSS, Pug, JS та автоматичною збіркою.

## 📁 Структура проєкту
HW_GULP 33/ 
├── assets/ │   
├── scss/       # SCSS стилі │   
├── js/         # JavaScript файли │   
└── css/        # Зкомпільовані стилі 
├── templates/      # Pug-шаблони │   
├── layout.pug │   
├── index.pug │   
└── partials/ 
├── dist/           # Готова збірка 
├── gulpfile.js     # Налаштування Gulp 
├── package.json    # Залежності 
└── README.md       # Опис проєкту

## ⚙️ Можливості

- SCSS → CSS з автопрефіксами та мінімізацією
- Pug → HTML з layout і partials
- JS: об’єднання та мінімізація
- Live reload через BrowserSync
- Source maps для зручної розробки
- Продакшн-збірка через `gulp build`

## 🚀 Встановлення

```bash
npm install
npx gulp serve

🛠️ Технології
- Gulp
- SCSS
- Pug
- JavaScript


---

## 🎨 2. Підключення Google Fonts

Наприклад, шрифт **Roboto** з [fonts.google.com](https://fonts.google.com):

### 🔗 У `layout.pug` додай у `<head>`:

```pug
link(rel="preconnect" href="https://fonts.googleapis.com")
link(rel="preconnect" href="https://fonts.gstatic.com" crossorigin)
link(href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet")



