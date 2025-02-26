## Роутинг

Настройка роутинга в app.vue
```
<NuxtLayout>
    <NuxtPage />
</NuxtLayout>
```
где **NuxtLayout** - это шаблон страницы, который может содержать общие элементы для всех страниц, такие как шапка, меню, футер и т.д.
**NuxtPage** - это компонент, который отображает текущую страницу.

В папке **pages** храним страницы.
Главная страница хранится в файле **index.vue**
для путей создаем папку например **events** она будет доступна по пути **/events/**, для нее тоже нужен главный файл **index.vue**
для вложенных страниц создаем файл в той же папке, но названия нужной страницы, например **profile.vue** и он будет доступен по пути /events/profile
Так же можно просто создать внутри папки еще папку пути и дать ей файл index.vue

Для создания страниц по id можем создать файл **[id].vue** где внутри будет доступ к параметрам через **$route.params.id**
```
 event id : {{ $route.params.id }}
```
тоесть перейдя на **/events/123** мы увидим **event id : 123**

получить доступ в js можно через **useRoute**
```
import { useRoute } from 'vue-router';

const route = useRoute(); -> получаем доступ к параметрам
console.log(route.params.id); -> выводим в консоль
```

**еще способ** получить контекс конкретной страницы это
```
import { useNuxtApp } from 'nuxt/app';

const nuxt = useNuxtApp();
```

### Для навигации
```
<NuxtLink to="/">Home</NuxtLink>
<NuxtLink to="/events">Events</NuxtLink>
```

## Компоненты
У нас есть автоимпорт компонентов из папки **components**
мы можем вызывать компоненты в любом месте страницы и не импортировать их
Можно создавать папки, например **Profile** и внутри файл **index.vue** 
и вызывать **<Profile />** в любом месте страницы
Можно создавать вложенные компоненты, например **Profile/Header/index.vue** и вызывать **<ProfileHeader />** в любом месте страницы.
Тоесть родительская папка а потом папка с компонентом

## Лейауты

можно использовать лейауты дефолтные, например **layouts/default.vue**
работает без вызова и выводится на странице

чтобы вывести контент страницы нужно передать слот в лейаут
```
<slot /> -> сюда получаем конкретную страницу
```

Стили дефолтного лейаута применяются на страницу

Чтобы указать лейаут для страницы нужно его определить таким образом
```
definePageMeta({
    layout: 'custom'
})
```
опять же он будет работать без вызова

## Assets

Разница между директориями `public` и `assets` в Nuxt 3 заключается в том, что файлы в директории `public` обслуживаются "как есть", что означает, что они не обрабатываются webpack и могут быть напрямую доступны из корня сервера, так же они не кешируются. С другой стороны, файлы в директории `assets` обрабатываются webpack и обычно используются для ресурсов, требующих обработки, таких как изображения, CSS или JavaScript файлы.


В настройке nuxt.config можно указать alias для директорий помимо файла css
чтобы не писать у картинок ~/assets/vue.png мы можем прописать
```
assets: "/<rootDir>/assets",
```
и писать просто @ в пути, @/assets/vue.png

папка **public** используется как публичный сервер для статичных файлов
доступ до картинки можно получить просто написав например
**localhost:3000/pinia.jpg** или в коде
```
 <img src="/pinia.jpg" alt="Alt">
```

**файлы которыми можно поделиться (чтобы их вытащили) пишем в паблик, иначе в ассеты**

## Composables

Повторяющиеся функции пишем в **composables**, из этой папки у них автоимпорт
**важно** создавать файлы с названием **use** и .ts (мб настройка конфига поможет)
например в папке **composables** создаем файл **useUtils.ts**
```
export const useUtils = () => {
    const sayHello = () => console.log("Hello")
    return {
        sayHello
    }
}
```
и на странице получаем функцию
```
const { sayHello} = useUtils()
sayHello()
```
если хотим передать параметры, то пишем в функцию
```
export const useUtils = () => {
    const sayHello = (text: string) => console.log(text)
    return {
        sayHello
    }
}
```

## Плагины

Плагины нужны для тригера каких-то функций, они отрабатывают раньше чем composables и доступны везде
в папке **plugins** создадим файл **myPlugin.ts**
```
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            sayHello: (msg: string) => console.log(`Hello ${msg}`)
        }
    }
})
```
в файле страницы принимаем
```
<script setup lang="ts">
const {$sayHello} = useNuxtApp()
$sayHello("Name")
</script>
```

плагины получают доступ до контекста
например в плагины встаиваются **аналитика для гугл метрик**

## Middlewares
Middleware в Nuxt 3 — это функции, которые выполняются перед рендерингом страницы. Они могут использоваться для выполнения различных задач, таких как проверка аутентификации, редиректы или настройка данных.

они пишутся в папке **middleware**
например файл **auth.ts**
```
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Error:', to)
    console.log('Error:', from)
})
```

каждый middleware надо объявить, если мы хотим глобальный то название файла должно быть **auth.global.ts** с **global**

объявление на примере **auth.ts**
```
definePageMeta({
    middleware: 'auth'
})
```

## Модули
Модули в Nuxt 3 используются для расширения функциональности приложения. Они позволяют добавлять новые возможности, такие как интеграция с API, управление состоянием, аутентификация, и многое другое, без необходимости писать весь код с нуля. Модули могут быть как встроенными, так и сторонними, и их легко подключать и настраивать.

## State management
В nuxt есть useState и это замена ref
в composables можем создать файлик и там написать
```
export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')
```

Первый аргумент функции useState в Nuxt 3 является ключом состояния. Этот ключ используется для идентификации и доступа к состоянию в различных частях  приложения. В приведенном примере:

Эти ключи позволяют вам обращаться к соответствующим состояниям (counter и color) в любом месте  приложения, обеспечивая их синхронизацию.

const counter = useCounter();
const color = useColor();

через useState мы получаем везде его значение и оно всегда одинаковое, тоесть если мы меняем где-то то оно меняется везде, получается такой мини-стейт
пример получения
```
const counter = useCounter();
```

это называется **Shared State**

Когда используем **useState** и когда **Pinia**
Для больших - Pinia
Для маленьких - useState

Пример Pinia
создаем папку **stores** и внутри файл **myStore.js**
```
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    const counter = ref(2)
    const name = ref('Kirill')
    const doubleCount = computed(() => counter.value * 2)
    function increment() {
        counter.value++
    }
    return { counter, name, doubleCount, increment }
})
```
в файле страницы принимаем стор
```
<script setup lang="ts">
import { useCounterStore } from '~/stores/myStore';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { counter, name, doubleCount } = storeToRefs(store);
const increment = store.increment
</script>

<template>
    <div>
        <h1>Index Page</h1>
        Counter {{ counter }}
        Name {{ name }}
        Double Count {{ doubleCount }}
        <button @click="increment">Increment</button>
    </div>
</template>
```

## Server
В nuxt можно в папке **server** писать бэкэнд или апишку
пример папка **routes** внутри папка **api** создаем файл **hello.ts**
```
export default defineEventHandler((event) => {
    return {
        api: "works"
    }
})
```

теперь в браузере пишем **localhost:3000/api/hello** и видим ответ
так же можем применить действие к ответу например **hello.get.ts**
у нас будет гет метод

## Nitro
Nitro в Nuxt 3 - это новый механизм компиляции и запуска проектов, который обеспечивает быструю разработку и оптимизированную производительность за счет предварительной компиляции и кэширования данных.

Раньше nuxt был на node.js

## Rendering modes

Nuxt 3 поддерживает три режима рендеринга:

Nuxt 3 поддерживает несколько режимов рендеринга, каждый из которых имеет свои преимущества и недостатки:
1. Статическая генерация (SSG)
Преимущества:
Быстрая загрузка страниц, так как HTML предварительно сгенерирован.
Лучше для SEO, так как контент доступен сразу.
Сниженная нагрузка на сервер, так как страницы обслуживаются как статические файлы.
Недостатки:
Не подходит для сильно динамического контента, который часто меняется.
Требуется этап сборки для регенерации страниц при изменении контента.
2. Серверный рендеринг (SSR)
Преимущества:
Динамический контент всегда актуален.
Лучше для SEO по сравнению с клиентским рендерингом.
Может обрабатывать контент, зависящий от пользователя, и аутентификацию.
Недостатки:
Высокая нагрузка на сервер, так как страницы рендерятся при каждом запросе.
Более медленная начальная загрузка по сравнению со статической генерацией.
3. Гибридный рендеринг (HSR)
Преимущества:
Сочетает преимущества SSG и SSR.
Статический контент предварительно сгенерирован, а динамический рендерится на сервере.
Можно оптимизировать как для производительности, так и для динамического контента.
Недостатки:
Более сложная настройка и конфигурация.
Требует тщательного планирования для балансировки статического и динамического контента.
4. Клиентский рендеринг (CSR)
Преимущества:
Быстрая начальная загрузка для последующих навигаций, так как загружается только JavaScript.
Сниженная нагрузка на сервер, так как рендеринг происходит на клиенте.
Хорошо подходит для сильно интерактивных приложений.
Недостатки:
Начальная загрузка может быть медленнее из-за выполнения JavaScript.
Не так хорошо для SEO, как SSR или SSG.
Требует больше ресурсов клиента, что может повлиять на производительность на устройствах с низкой производительностью.
Резюме
SSG идеально подходит для статических сайтов с редкими изменениями контента.
SSR лучше всего подходит для динамических сайтов, требующих актуального контента и данных, зависящих от пользователя.
HSR предлагает баланс для сайтов, нуждающихся как в статическом, так и в динамическом контенте.
CSR подходит для сильно интерактивных приложений, но может страдать в SEO и производительности начальной загрузки.

## useFetch
useFetch в Nuxt 3 — это хук, который позволяет легко выполнять асинхронные запросы к API и управлять состоянием загрузки и ошибок. Он упрощает работу с данными, которые нужно получить до рендеринга компонента.

## useAsyncData
useAsyncData обеспечивает доступ к данным, которые разрешаются асинхронно в компонуемом объекте, дружественном к SSR.
На своих страницах, в компонентах и ​​плагинах  можно использовать useAsyncData для получения доступа к данным, которые обрабатываются асинхронно.

можем в папке **api** создать файл **products.ts**
```
let productCount = 0;

export default async () => {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(productCount++)
        }, 2000)
    })
    return {
        productCount
    }
}
```

и проверить на странице
```
<script setup>
const { data: productCount, pending } = await useAsyncData('products', () => 
$fetch('/api/products'))

const refresh = () => refreshNuxtData('products')
</script>

<template>
    <div>
        <h1>Index Page</h1>
        <p>{{ pending ? 'Loading...' : productCount }}</p>
        <button @click="refresh">Refresh</button>
    </div>
</template>
```

у нас есть функция **refreshNuxtData** которая обновляет данные

## Seo и meta

настройка меты в **nuxt.config.ts**
```
app:{
    // эти данные будут доступны на всех страницах
    head: {
      title: "Nuxt Practice",
      // настройка меты
      meta: [
        {
          name: "description",
          content: "This is a description of the page",
        }
      ]
    }
  },
```

эта мета будет доступна везде, как настроить мету для **отдельных страниц** ниже

на странице пишем
```
useHead({
    title: "Index Page title",
    meta: [
        {name: 'description', content: 'Index page description'}
    ],
    bodyAttrs: {
        class: "test"
    },
    script: [{children: 'console.log(\'Hello World\')'}] -> вызов скрипта, хорошо для вызова cdn для определенной страницы
})
```

обязательно указать **lang=ts**

так же возможно использовать специальные компоненты для меты, пример
```
<Head>
    <Title>This is the title</Title>
</Head>
```

можно использовать для динамических мет, через **ref** и передачей пропса
```
<Meta name="description" :content="title" />
```

или

```
const title = ref('This is the dinamic title')
useHead({
    title: title,
    meta: [
        {name: 'description', content: title}
    ]
})
```

так же можно писать мету в **useSeoMeta**, но это хуже и меньше функционала

## Hooks

hooks это функции которые вызываются в определенные моменты жизни приложения
например **useFetch** это хуки

есть хуки на сервере и на клиенте

хуки пишутся в **nuxt.config.ts**
```
hooks: {
    'ready': (ctx) => console.log(ctx)
}
```

так же можно писать в папке **plugins**

```
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:created", () => {
        console.log("hello from plugin")
    })
})
```

## Конфиг файл nuxt.config.ts

Кучу настроек для сайта, смотреть примеры в офф. доке


## Nuxt content

Модуль для управления контентом, написанным в markdown

нужно установить модуль
```
npx nuxi@latest module add content

 modules: [
    '@nuxt/content'
  ],
```
