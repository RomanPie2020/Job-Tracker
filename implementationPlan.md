# 🌟 Job Application Tracker — Повний план розробки

**Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + NextAuth + Vercel KV + Zustand (Optimistic UI) + dnd-kit + Framer Motion + Recharts**

Це — чіткий, лінійний, професійний план розробки застосунку у правильному порядку.

---

# 1. 🚀 Старт проєкту

### 1.1. Створити Next.js проєкт за допомогою bun

```
bun create next job-tracker
cd job-tracker
```

### 1.2. Встановити залежності (списком)

**Основні:**

* next-auth
* @vercel/kv
* uuid

**Стан:**

* zustand

**Drag & Drop (Kanban):**

* @dnd-kit/core
* @dnd-kit/sortable
* @dnd-kit/modifiers

**UI:**

* shadcn/ui
* tailwindcss (вже є)
* autoprefixer (вже є)
* postcss (вже є)

**Анімації:**

* framer-motion

**Графіки:**

* recharts

**Dev utilities:**

* typescript
* eslint
* prettier

Встановлення всієї групи:

```
bun add next-auth @vercel/kv uuid zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers framer-motion recharts
```

### 1.3. Ініціалізувати shadcn/ui

```
bunx shadcn-ui init
```

Компоненти:

```
bunx shadcn-ui add button card dialog input textarea dropdown-menu avatar
```

---

# 2. 🎨 Базова архітектура

### 2.1. Структура директорій

```
app/
  layout.tsx
  globals.css
  page.tsx
  dashboard/
    page.tsx
    loading.tsx

app/api/auth/[...nextauth]/route.ts
app/api/jobs/route.ts

components/
  navbar.tsx
  modals/add-job-modal.tsx
  kanban/
    board.tsx
    column.tsx
    job-card.tsx
  charts/status-chart.tsx

store/useJobsStore.ts
lib/auth.ts
lib/jobs.server.ts
utils/job-types.ts
```

---

# 3. 🔐 Аутентифікація Google (NextAuth)

### 3.1. Створити `lib/auth.ts`

* Підключити GoogleProvider.
* Налаштувати `secret`.
* У callback передавати email, name, image.

### 3.2. Створити маршрут `/api/auth/[...nextauth]`

* GET/POST handler через NextAuth.
* Імпортувати `authOptions` з `lib/auth.ts`.

### 3.3. У `layout.tsx`

* Обгорнути `<body>` у `<SessionProvider>`.

---

# 4. 🗂️ Модель даних

### 4.1. Тип `Job`

```ts
interface Job {
  id: string
  title: string
  company: string
  status: "Applied" | "Screening" | "Interview" | "Offer" | "Rejected"
  createdAt: number
  notes?: string
}
```

### 4.2. Формат ключа в KV

```
jobs:{email}
```

---

# 5. 🧩 Серверна логіка (CRUD через KV)

У `lib/jobs.server.ts` реалізувати:

### 5.1. `getJobs(email)`

* Зчитати jobs.
* Якщо нема → повернути порожній масив.

### 5.2. `createJob(email, jobData)`

* Згенерувати `uuid`.
* Додати до масиву.
* Записати назад у KV.

### 5.3. `updateJob(email, job)`

* Замінити існуючий job у масиві.
* Перезаписати масив у KV.

### 5.4. `deleteJob(email, id)`

* Видалити job.
* Записати назад.

---

# 6. 🌐 API маршрути

Створити `app/api/jobs/route.ts` з методами:

### GET

* Перевірити session.
* Викликати `getJobs`.
* Повернути JSON.

### POST

* Зчитати тіло.
* Викликати `createJob`.
* Повернути оновлений масив.

### PUT

* Оновити job.
* Повернути оновлений масив.

### DELETE

* Видалити job.
* Повернути оновлений масив.

---

# 7. 🧠 Zustand Store (Optimistic UI)

Створити `useJobsStore.ts`.

### Стан:

```
jobs: Job[]
isSyncing: boolean
lastError?: string
```

### Методи:

#### `setJobs(jobs)`

Ініціалізація стану після завантаження із сервера.

#### `optimisticCreate(jobData)`

* Створити temporary job (id: `"tmp-..."`).
* Додати у jobs локально.
* Відправити POST.
* Якщо success → замінити масив jobs.
* Якщо error → видалити tmp job і записати помилку.

#### `optimisticUpdate(id, patch)`

* Зберегти старе значення.
* Оновити локально.
* Відправити PUT.
* Помилка → відкат.

#### `optimisticDelete(id)`

* Зберегти job.
* Видалити локально.
* Відправити DELETE.
* Помилка → повернути назад.

---

# 8. 📄 Dashboard

`dashboard/page.tsx`:

1. Отримати сесію через `getServerSession`.
2. Якщо немає — redirect на `/`.
3. Зчитати jobs через `getJobs(email)`.
4. Передати jobs у клієнт як prop.
5. На клієнті викликати `setJobs(jobs)` в Zustand.

Компоненти:

* `<Navbar />`
* `<AddJobModal />`
* `<Board />`
* `<StatusChart />`

---

# 9. 🗂️ Kanban Board (dnd-kit)

### 9.1. `board.tsx`

* `DndContext`.
* Перелік колонок у правильному порядку.
* Подія `onDragEnd`:

  * Визначити card → jobId.
  * Визначити droppable area → newStatus.
  * Викликати `optimisticUpdate(jobId, { status: newStatus })`.

### 9.2. `column.tsx`

* Заголовок (Applied / Screening / …)
* Мапінг job-карток
* Drop target для dnd-kit

### 9.3. `job-card.tsx`

* Draggable елемент.
* Анімації hover/press через Framer Motion.
* Дії:

  * Edit (опціонально — через modal)
  * Delete (кнопка або у контекстному меню)

---

# 10. ➕ Add Job Modal

`add-job-modal.tsx`:

Форма:

* title (required)
* company (required)
* notes (optional)

Submit:

* Виклик `optimisticCreate`.
* Закрити модал.
* Очистити стор.

UX:

* focusTrap
* autoFocus на першому полі
* ESC → закрити

---

# 11. 📊 Діаграма статусів (Recharts)

`status-chart.tsx`:

1. Порахувати кількість job у кожному статусі.
2. Створити масив:

```
{ name: "Applied", value: N }
```

3. Відобразити PieChart або BarChart.
4. Додати Framer Motion fade-in.

---

# 12. 🎨 Анімації (Framer Motion)

Де застосувати:

### Board:

* Початкова анімація (opacity 0 → 1).

### Job cards:

* Hover scale: 1 → 1.02
* Dragging state: shadow + slight rotate
* Drop transition: smooth layout transition

### Modal:

* backdrop fade-in
* dialog slide-up

---

# 13. 🧭 Navbar

Навбар повинен включати:

* Логотип або назву застосунку
* Аватар користувача
* Dropdown:

  * Email
  * Sign Out

Розмістити його як sticky top.

---

# 14. 🧼 Валідація та UX

* Валідація в модалці:

  * title та company — required
* Toast повідомлення для:

  * створення job
  * видалення
  * помилка синхронізації
* Drag&drop:

  * debounce при масових оновленнях (optional)
* Підсвічування активної колонки при dnd-hover

---

# 15. 📱 Responsive дизайн

### На мобільному:

* Колонки розташовані горизонтально з прокруткою
* Chart → 1 колонка
* “Add Job” → кнопка у navbar або на екрані зверху

### На desktop:

* Стандартна Kanban-сітка
* Chart внизу на всю ширину

---

# ✔️ Все

Це — **готова, продумана як у професійного девелопера інструкція**, у правильному порядку, без нічого зайвого.

Можеш брати цей `.md` і починати імплементацію хоч зараз.

Як хочеш — можу згенерувати повний **файловий шаблон із порожніми компонентами**, щоб ти міг одразу почати писати код.
