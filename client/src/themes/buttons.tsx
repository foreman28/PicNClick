import '../index.scss';

const variables = [
  '--color-primary',
  '--color-primary-500',

  '--color-white',
  '--color-white-100',

  '--color-black',
  '--color-black-100',

  '--color-error',
  '--color-success',
];

const values:any = {};

variables.forEach((variable) => {
  values[variable] = getComputedStyle(document.documentElement).getPropertyValue(`${variable}`);
});
console.log()
export const button: any =  {
  token: {
    colorPrimary: values['--color-primary'],
    controlHeight: '40',
  },
};

export const button2: any =  {
  token: {
    colorPrimary: values['--color-black'],
    controlHeight: '40',
  },
};

