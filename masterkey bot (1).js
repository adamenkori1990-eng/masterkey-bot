// ============================================
// MasterKey Locksmith — Telegram Bot
// Node.js + node-telegram-bot-api
// Languages: EN / RU / ES
// ============================================

const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN; // вставь токен в Railway как переменную окружения
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID; // твой Telegram chat_id (или друга)

const bot = new TelegramBot(TOKEN, { polling: true });

// ─── Тексты на трёх языках ───────────────────────────────────────────────────

const i18n = {
  en: {
    welcome: `🔐 *Welcome to MasterKey Locksmith!*\n\nWe provide fast, reliable locksmith services — available 24/7.\n\nChoose an option below:`,
    menu: [
      ["🚨 Emergency", "📋 Services"],
      ["💰 Pricing", "⏱ Response Time"],
      ["📍 Service Area", "📞 Contact Us"],
    ],
    emergency: `🚨 *EMERGENCY? We're here!*\n\nCall us NOW:\n📞 *+1 (XXX) XXX-XXXX*\n\nWe arrive in *15–30 minutes* across the LA area.\n\n_Available 24/7, including holidays._`,
    services: `🔧 *Our Services:*\n\n🏠 *Residential*\n• Lockout assistance\n• Lock replacement & rekey\n• Deadbolt installation\n\n🚗 *Automotive*\n• Car lockout\n• Key duplication\n• Ignition repair\n\n🏢 *Commercial*\n• Master key systems\n• Access control\n• Safe opening`,
    pricing: `💰 *Pricing (starting from):*\n\n• Lockout — from $45\n• Rekey (per lock) — from $25\n• Deadbolt install — from $65\n• Car lockout — from $55\n\n_Final price depends on lock type and location.\nFree estimate over the phone!_`,
    response: `⏱ *Response Time:*\n\n✅ Emergency — 15–30 min\n✅ Scheduled — same day\n\nWe serve *Los Angeles & surrounding areas* 24/7.`,
    area: `📍 *Service Area:*\n\nWe cover all of Los Angeles County:\nWest Hollywood • Beverly Hills • Hollywood\nSanta Monica • Burbank • Glendale\nPasadena • Culver City & more\n\n_Not sure if we cover your area? Just ask!_`,
    contact: `📞 *Contact MasterKey Locksmith:*\n\n📱 Phone/Text: *+1 (XXX) XXX-XXXX*\n💬 Telegram: this chat\n\n_We respond within minutes!_`,
    unknown: `I didn't quite get that. Please use the menu below or type your question.`,
    lead_notify: (name, msg) =>
      `🔔 *New Lead (EN)*\n👤 ${name}\n💬 ${msg}`,
  },

  ru: {
    welcome: `🔐 *Добро пожаловать в MasterKey Locksmith!*\n\nБыстрая и надёжная помощь слесаря — 24/7.\n\nВыбери нужный пункт:`,
    menu: [
      ["🚨 Экстренный вызов", "📋 Услуги"],
      ["💰 Цены", "⏱ Время приезда"],
      ["📍 Зона работы", "📞 Контакты"],
    ],
    emergency: `🚨 *СРОЧНО? Звоните прямо сейчас!*\n\n📞 *+1 (XXX) XXX-XXXX*\n\nПриедем за *15–30 минут* по всему LA.\n\n_Работаем 24/7, включая праздники._`,
    services: `🔧 *Наши услуги:*\n\n🏠 *Дом / Квартира*\n• Вскрытие замка\n• Замена и перекодировка замков\n• Установка deadbolt\n\n🚗 *Автомобиль*\n• Вскрытие авто\n• Дубликат ключа\n• Ремонт замка зажигания\n\n🏢 *Бизнес*\n• Мастер-ключи\n• Системы контроля доступа\n• Вскрытие сейфов`,
    pricing: `💰 *Цены (от):*\n\n• Вскрытие замка — от $45\n• Перекодировка (1 замок) — от $25\n• Установка deadbolt — от $65\n• Вскрытие авто — от $55\n\n_Точная цена зависит от типа замка и адреса.\nБесплатная консультация по телефону!_`,
    response: `⏱ *Время приезда:*\n\n✅ Экстренный вызов — 15–30 мин\n✅ Плановый выезд — в тот же день\n\nРаботаем по всему *Los Angeles County* 24/7.`,
    area: `📍 *Зона обслуживания:*\n\nВесь округ Лос-Анджелес:\nWest Hollywood • Beverly Hills • Hollywood\nSanta Monica • Burbank • Glendale\nPasadena • Culver City и другие районы\n\n_Не уверен, приедем ли к тебе? Просто спроси!_`,
    contact: `📞 *Связаться с MasterKey Locksmith:*\n\n📱 Телефон/SMS: *+1 (XXX) XXX-XXXX*\n💬 Telegram: этот чат\n\n_Отвечаем в течение нескольких минут!_`,
    unknown: `Не совсем понял запрос. Воспользуйся меню или напиши свой вопрос.`,
    lead_notify: (name, msg) =>
      `🔔 *Новый лид (RU)*\n👤 ${name}\n💬 ${msg}`,
  },

  es: {
    welcome: `🔐 *¡Bienvenido a MasterKey Locksmith!*\n\nServicios de cerrajería rápidos y confiables — 24/7.\n\nElige una opción:`,
    menu: [
      ["🚨 Emergencia", "📋 Servicios"],
      ["💰 Precios", "⏱ Tiempo de llegada"],
      ["📍 Área de servicio", "📞 Contacto"],
    ],
    emergency: `🚨 *¿EMERGENCIA? ¡Llámanos ahora!*\n\n📞 *+1 (XXX) XXX-XXXX*\n\nLlegamos en *15–30 minutos* en toda el área de LA.\n\n_Disponibles 24/7, incluso feriados._`,
    services: `🔧 *Nuestros Servicios:*\n\n🏠 *Residencial*\n• Apertura de puertas\n• Cambio y recodificación de cerraduras\n• Instalación de cerrojos\n\n🚗 *Automotriz*\n• Apertura de vehículos\n• Copia de llaves\n• Reparación de encendido\n\n🏢 *Comercial*\n• Llaves maestras\n• Control de acceso\n• Apertura de cajas fuertes`,
    pricing: `💰 *Precios (desde):*\n\n• Apertura — desde $45\n• Recodificación (por cerradura) — desde $25\n• Instalación de cerrojo — desde $65\n• Apertura de auto — desde $55\n\n_El precio final depende del tipo de cerradura y ubicación.\n¡Presupuesto gratis por teléfono!_`,
    response: `⏱ *Tiempo de respuesta:*\n\n✅ Emergencia — 15–30 min\n✅ Programado — el mismo día\n\nServimos todo el *Condado de Los Ángeles* 24/7.`,
    area: `📍 *Área de servicio:*\n\nTodo el Condado de Los Ángeles:\nWest Hollywood • Beverly Hills • Hollywood\nSanta Monica • Burbank • Glendale\nPasadena • Culver City y más\n\n_¿No estás seguro si llegamos a tu área? ¡Pregunta!_`,
    contact: `📞 *Contacta a MasterKey Locksmith:*\n\n📱 Teléfono/SMS: *+1 (XXX) XXX-XXXX*\n💬 Telegram: este chat\n\n_¡Respondemos en minutos!_`,
    unknown: `No entendí tu mensaje. Usa el menú o escribe tu pregunta.`,
    lead_notify: (name, msg) =>
      `🔔 *Nuevo Lead (ES)*\n👤 ${name}\n💬 ${msg}`,
  },
};

// ─── Определение языка пользователя ──────────────────────────────────────────

const userLang = {}; // { chat_id: 'en' | 'ru' | 'es' }

function getLang(chatId) {
  return userLang[chatId] || "en";
}

function detectLang(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (/[а-яё]/.test(t)) return "ru";
  if (/[ñáéíóúü]/.test(t) || /hola|gracias|ayuda|emergencia/.test(t))
    return "es";
  return "en";
}

// ─── Клавиатура меню ──────────────────────────────────────────────────────────

function mainKeyboard(lang) {
  return {
    reply_markup: {
      keyboard: i18n[lang].menu,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
}

// ─── Уведомление владельцу ───────────────────────────────────────────────────

function notifyOwner(name, message) {
  if (!OWNER_CHAT_ID) return;
  const text = `🔔 *Новое сообщение от клиента*\n👤 ${name}\n💬 ${message}`;
  bot.sendMessage(OWNER_CHAT_ID, text, { parse_mode: "Markdown" });
}

// ─── Выбор языка при старте ───────────────────────────────────────────────────

function sendLanguageChoice(chatId) {
  bot.sendMessage(chatId, "🌐 Choose your language / Выберите язык / Elige tu idioma:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🇺🇸 English", callback_data: "lang_en" },
          { text: "🇷🇺 Русский", callback_data: "lang_ru" },
          { text: "🇪🇸 Español", callback_data: "lang_es" },
        ],
      ],
    },
  });
}

// ─── /start ───────────────────────────────────────────────────────────────────

bot.onText(/\/start/, (msg) => {
  sendLanguageChoice(msg.chat.id);
});

// ─── Выбор языка (inline callback) ───────────────────────────────────────────

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data.startsWith("lang_")) {
    const lang = data.replace("lang_", "");
    userLang[chatId] = lang;
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(chatId, i18n[lang].welcome, {
      parse_mode: "Markdown",
      ...mainKeyboard(lang),
    });
  }
});

// ─── Обработка текстовых сообщений ───────────────────────────────────────────

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith("/")) return;

  // Автоопределение языка если не выбран
  if (!userLang[chatId]) {
    const detected = detectLang(text);
    userLang[chatId] = detected || "en";
  }

  const lang = getLang(chatId);
  const t = i18n[lang];
  const firstName = msg.from.first_name || "Client";

  // Меню на всех языках
  const menuMap = {
    // EN
    "🚨 emergency": "emergency",
    "📋 services": "services",
    "💰 pricing": "pricing",
    "⏱ response time": "response",
    "📍 service area": "area",
    "📞 contact us": "contact",
    // RU
    "🚨 экстренный вызов": "emergency",
    "📋 услуги": "services",
    "💰 цены": "pricing",
    "⏱ время приезда": "response",
    "📍 зона работы": "area",
    "📞 контакты": "contact",
    // ES
    "🚨 emergencia": "emergency",
    "📋 servicios": "services",
    "💰 precios": "pricing",
    "⏱ tiempo de llegada": "response",
    "📍 área de servicio": "area",
    "📞 contacto": "contact",
  };

  const key = menuMap[text.toLowerCase()];

  if (key) {
    bot.sendMessage(chatId, t[key], {
      parse_mode: "Markdown",
      ...mainKeyboard(lang),
    });

    // Уведомить владельца об экстренном вызове
    if (key === "emergency") {
      notifyOwner(firstName, `⚠️ EMERGENCY REQUEST (${lang.toUpperCase()})`);
    }
  } else {
    // Свободный текст — уведомить владельца и ответить
    notifyOwner(firstName, text);
    bot.sendMessage(chatId, t.unknown, {
      parse_mode: "Markdown",
      ...mainKeyboard(lang),
    });
  }
});

console.log("🔐 MasterKey Locksmith Bot is running...");
