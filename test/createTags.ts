import {PrismaClient} from '@prisma/client';
import {transliterate} from "transliteration";

const prisma = new PrismaClient();

// start: ts-node createTags.ts

interface TagData {
  name: string;
  description: string;
}

const tagsData: TagData[] = [
  {"name": "Фотография", "description": "Общая тема для всех фотографических обсуждений и вопросов в сообществе."},
  {"name": "Мастерство", "description": "Обмен опытом и советами по повышению мастерства в искусстве фотографии."},
  {
    "name": "ОбработкаФото",
    "description": "Дискуссии о методах и техниках обработки фотографий, использование графических редакторов."
  },
  {"name": "Техника", "description": "Обсуждение фотоаппаратов, объективов и другого оборудования."},
  {
    "name": "ШколаФото", "description": "Ресурсы и рекомендации для обучения и совершенствования навыков фотографии."
  },
  {"name": "Композиция", "description": "Советы и примеры по созданию эффективных композиций в фотографии."},
  {"name": "Искусство", "description": "Разговоры о творческом искусстве в фотографии, выражение чувств и идей."},
  {"name": "СветТени", "description": "Аспекты использования света и теней для создания выразительных фотографий."},
  {"name": "Портрет", "description": "Тема, посвященная искусству создания портретных снимков."},
  {"name": "Пейзажи", "description": "Обсуждение и обмен опытом по съемке природы и пейзажей."},
  {"name": "УличнаяФотография", "description": "Техники и подходы к съемке уличных сцен и жизни."},
  {
    "name": "АрхитектурнаяФотография",
    "description": "Фотографии архитектурных объектов, техника съемки и композиция."
  },
  {"name": "Макро", "description": "Обсуждение и публикация снимков мелких объектов и деталей."},
  {"name": "Оборудование", "description": "Обзоры и обсуждения нового и существующего фотооборудования."},
  {"name": "Сессии", "description": "Разговоры о фотосессиях, подготовке и проведении."},
  {"name": "Техники", "description": "Обмен техниками и методами съемки различных видов фотографии."},
  {"name": "ФотоШоп", "description": "Тема посвященная графическому редактору Adobe Photoshop и его применению."},
  {"name": "Критика", "description": "Возможность получения конструктивной критики своих работ и обсуждение чужих."},
  {"name": "Конкурс", "description": "Анонсы и обсуждения фотоконкурсов в сообществе."},
  {
    "name": "КамерыОбъективы",
    "description": "Обсуждение характеристик и опыта использования различных камер и объективов."
  },
  {"name": "Дизайн", "description": "Тема, посвященная дизайну в фотографии, созданию гармоничных композиций."},
  {"name": "Портфолио", "description": "Советы по созданию и ведению фотопортфолио."},
  {"name": "Стили", "description": "Разговоры о различных стилях фотографии, их особенностях и основах."},
  {"name": "Цифровая", "description": "Вопросы и обсуждения, связанные с цифровой фотографией."},
  {"name": "Аналоговая", "description": "Разговоры о традиционной аналоговой фотографии и использовании пленки."},
  {"name": "Инструкции", "description": "Инструкции и рекомендации по различным аспектам фотографии."},
  {"name": "Ретушь", "description": "Техники ретуширования и обработки портретов."},
  {"name": "ФотоАрт", "description": "Искусство, объединяющее фотографию и художественную обработку."},
  {"name": "ТемыСессий", "description": "Идеи и рекомендации по выбору тем для фотосессий."},
  // {"name": "ТехСоветы", "description": "Советы по использованию техники и улучшению снимков."},
  // {"name": "Обучение", "description": "Ресурсы, курсы и программы обучения фотографии."},
  // {"name": "Креативная", "description": "Тема для обсуждения креативных подходов и экспериментов в фотографии."},
  // {"name": "Туториал", "description": "Обучающие материалы и пошаговые руководства по созданию фотографий."},
  // {"name": "ФотоСофт", "description": "Программное обеспечение для обработки и управления фотографиями."},
  // {"name": "ФотоКультура", "description": "Разговоры о культуре и истории фотографии."},
  // {"name": "Ресурсы", "description": "Ссылки и рекомендации на полезные ресурсы для фотографов."},
  // {"name": "События", "description": "Анонсы и обсуждения фотособытий, выставок и фестивалей."},
  // {"name": "Журналистика", "description": "Фотожурналистика, рассказы о событиях через объектив."},
  // {"name": "ДеловойСтрим", "description": "Обсуждения деловых аспектов фотографии, стримы и трансляции."},
  // {"name": "Спорт", "description": "Спортивная фотография, техники и хитрости съемки в динамике."},
  // {"name": "Сообщество", "description": "Общение и социализация среди участников сообщества."},
  // {"name": "Галерея", "description": "Публикация и обсуждение фотографий участников."},
  // {"name": "Путешествия", "description": "Фотографии с путешествий, советы и истории."},
  // {"name": "Книги", "description": "Рекомендации и обсуждения книг по фотографии."},
  // {"name": "Проекты", "description": "Совместные проекты и коллаборации фотографов."},
  // {"name": "Достижения", "description": "Поделитесь своими успехами и достижениями в фотографии."},
  // {"name": "Идеи", "description": "Обсуждение и генерация идей для новых фотопроектов."},
  // {"name": "Ресурсы", "description": "Информация о ресурсах, помогающих в развитии фотографических навыков."},
  // {"name": "Обзоры", "description": "Обзоры фотооборудования, программ и сервисов."},
  // {"name": "Ретроспектива", "description": "Взгляд в прошлое, обсуждение старых фотографий и технологий."},
  // {"name": "Коллекции", "description": "Обмен идеями и опытом по созданию фотоколлекций."},
  // {"name": "Фестивали", "description": "Информация и обсуждение фотофестивалей."},
  // {"name": "Организации", "description": "Разговоры о фотоорганизациях и сообществах."},
  // {"name": "Выставки", "description": "Обсуждение и впечатления от фотовыставок."},
  // {"name": "Графика", "description": "Эксперименты с графическими элементами в фотографии."},
  // {"name": "Акции", "description": "Участие в фотоконкурсах и благотворительных акциях."},
  // {"name": "Психология", "description": "Влияние фотографии на эмоции и восприятие."},
  // {"name": "Видео", "description": "Обсуждение создания видеоматериалов в контексте фотографии."},
  // {"name": "Репортаж", "description": "Техники и особенности фотожурналистики и репортажа."},
  // {"name": "Секреты", "description": "Обмен тайными хитростями и приемами в фотографии."},
  // {"name": "Аксессуары", "description": "Обсуждение различных аксессуаров для фотосъемки."},
  // {"name": "Уроки", "description": "Обучающие уроки и занятия по фотографии."},
  // {"name": "Концепция", "description": "Реализация фотоконцепций и идей."},
  // {"name": "Философия", "description": "Размышления о философских аспектах фотографии."},
  // {"name": "Реклама", "description": "Использование фотографии в рекламных кампаниях."},
  // {"name": "Свет", "description": "Исследование и использование света в фотографии."},
  // {"name": "Тенденции", "description": "Обсуждение актуальных тенденций в мире фотографии."},
  // {"name": "Селфи", "description": "Техники съемки себя, обсуждение жанра селфи."},
  // {"name": "Самоучитель", "description": "Советы и рекомендации по самообразованию в фотографии."},
  // {"name": "Карьера", "description": "Советы по построению карьеры в области фотографии."},
  // {"name": "Истории", "description": "Рассказы и воспоминания о фотографических историях."},
  // {"name": "Вдохновение", "description": "Источники вдохновения в мире фотографии."},
  // {"name": "Технологии", "description": "Обсуждение новых технологий в фотографии."},
  // {"name": "Коммуникации", "description": "Обмен опытом и знаниями через общение."},
  // {"name": "Манипуляции", "description": "Использование техник манипуляции в фотографии."},
  // {"name": "ОбменОпытом", "description": "Советы и опыт от опытных фотографов."},
  // {"name": "Программы", "description": "Программы и приложения для фотографии."},
  // {"name": "Мода", "description": "Фотография в мире моды и стиля."},
  // {"name": "Эксперименты", "description": "Творческие эксперименты и нестандартные подходы."},
  // {"name": "Продажи", "description": "Вопросы продаж и монетизации фотографий."},
  // {"name": "Разработка", "description": "Разработка собственных фотоидей и концепций."},
  // {"name": "Природа", "description": "Фотографии природы и животных."},
  // {"name": "Здоровье", "description": "Влияние фотографии на здоровье и эмоциональное состояние."},
  // {"name": "Спонтанность", "description": "Фиксирование моментов непосредственности."},
  // {"name": "Семинары", "description": "Информация о фотосеминарах и мастер-классах."},
  // {"name": "Игры", "description": "Творческие и образовательные игры в фотографии."},
  // {"name": "Обои", "description": "Фотографии, подходящие для использования в качестве обоев."},
  // {"name": "ГрафическиеИсследования", "description": "Исследование графических элементов в фотографии."},
  // {"name": "Бизнес", "description": "Обсуждение аспектов фотобизнеса и предпринимательства."},
  // {"name": "Подкасты", "description": "Подкасты о фотографии и визуальном искусстве."},
  // {"name": "Развитие", "description": "Личное и профессиональное развитие в сфере фотографии."},
  // {"name": "Блоггинг", "description": "Создание и ведение блога о фотографии."},
  // {"name": "Монтаж", "description": "Техники фотомонтажа и обработки."},
  // {"name": "Планета", "description": "Фотографии природы и окружающей среды."},
  // {"name": "Детали", "description": "Съемка мелких деталей и текстур."},
  // {"name": "Окружение", "description": "Влияние окружающей среды на фотографию."},
  // {"name": "Новости", "description": "Свежие новости и события в мире фотографии."},
  // {"name": "Эффекты", "description": "Исследование различных эффектов в фотографии."},
  // {"name": "ОбучающиеИгры", "description": "Игры и упражнения для обучения фотографии."},
  // {"name": "Креатив", "description": "Слово, объединяющее креативные идеи фотографов в сообществе."}
];

// @ts-ignore
(async () => {
  try {
    for (let i = 0; i < tagsData.length; i++) {
      const tag = tagsData[i];
      const url: string =
        transliterate(tag.name)
          .toLowerCase().replace(/\s+/g, '-')
      
      await prisma.tags.create({
// @ts-ignore
        data: {
          name: tag.name,
          description: tag.description,
          url: url
        },
      });
    }
  } catch (error) {
    console.error('Error creating tags:', error);
  } finally {
    await prisma.$disconnect();
  }
})();