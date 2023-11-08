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

export const button: any =  {
  token: {
    colorPrimary: values['accent-2'],
    controlHeight: '40',
  },
};

export const button2: any =  {
  token: {
    colorPrimary: values['text-1'],
    controlHeight: '40',
  },
};

