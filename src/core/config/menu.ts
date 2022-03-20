export const menuConfig = {
  shift: {
    path: '/price-list',
    title: 'Ценники',
    name: 'priceList',
    icon: 'sidebar/change',
    childrens: [
      {
        title: 'Ручная печать',
        id: 1,
        child: true,
        route: '/price-list/manual-print',
      },
      {
        title: 'Приказы',
        id: 2,
        child: true,
        route: '/price-list/orders',
      },
    ],
  },

  cashbox: {
    path: '/cashbox',
    title: 'Касса',
    name: 'cashbox',
    icon: 'sidebar/cashbox',
    childrens: [
      {
        title: 'Главная касса',
        id: 20,
        childrens: [
          {
            title: 'Операции',
            id: 21,
            child: true,
            route: '/cashbox/operations',
          },
          {
            title: 'Кассовая книга',
            id: 22,
            child: true,
            route: '/cashbox/cashbook',
          },
        ],
      },
      {
        title: 'Операционная касса',
        id: 23,
        childrens: [
          {
            title: 'Продажи',
            id: 232,
            child: true,
            route: '/cashbox/sales',
          },
        ],
      },
    ],
  },

  property: {
    title: 'Управление запасами',
    icon: 'sidebar/commodityStock',
    name: 'property',
    childrens: [
      {
        title: 'Поставки',
        id: 30,
        childrens: [
          {
            title: 'Операции',
            id: 31,
            child: true,
            route: '/addmission/operations',
          },
          {
            title: 'Заявки',
            id: 32,
            child: true,
            route: '/addmission/bid',
          },
        ],
      },
      // { title: "Инвентаризация", id: 2, route: "/" },
      {
        title: 'Списания',
        id: 33,
        childrens: [
          {
            title: 'Заявки',
            id: 34,
            child: true,
            route: '/writeoff/orders',
          },
          {
            title: 'Операции',
            id: 35,
            child: true,
            route: '/writeoff/operations',
          },
        ],
      },
      {
        title: 'Инвентаризация',
        id: 36,
        childrens: [
          {
            title: 'Заявки',
            id: 37,
            child: true,
            route: '/inventory/applications',
          },
          {
            title: 'Операции',
            id: 38,
            child: true,
            route: '/inventory/operations',
          },
        ],
      },
    ],
  },
};
