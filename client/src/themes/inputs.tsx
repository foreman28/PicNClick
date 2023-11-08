import '../index.scss';

const variables = [
  'accent-1',
  'accent-1-1',
  'accent-2',
  'accent-2-1',

  'white-1',
  'white-2',

  'text-1',
  'text-2',

  'error',
  'good',
];

const values:any = {};

variables.forEach((variable) => {
  values[variable] = getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`);
});

export const inputText: any =  {
  token: {
    colorPrimary: values['accent-2'],
    colorBgContainer: values['white-2'],
    // colorPrimaryHover: '#DCE9FD',
    borderRadius: 2,

    controlHeight: '40',

    colorTextPlaceholder: values['text-2'],
    colorText: values['text-1']
  },
};

export const inputPassword: any =  {
  token: {
    colorPrimary: values['accent-2'],
    colorBgContainer: values['white-2'],
    // colorPrimaryHover: '#DCE9FD',
    borderRadius: 2,
    colorIcon: values['text-1'],
    colorIconHover: values['accent-2'],

    colorTextPlaceholder: values['text-2'],
    colorText: values['text-1']
  },
};

