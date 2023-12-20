import '../App.scss';

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

export const inputText: any =  {
  token: {
    colorPrimary: values['--color-primary'],
    colorBgContainer: values['--color-white-100'],
    // colorPrimaryHover: '#DCE9FD',
    borderRadius: 2,

    controlHeight: '40',

    colorTextPlaceholder: values['--color-black-100'],
    colorText: values['--color-black']
  },
};

export const inputPassword: any =  {
  token: {
    colorPrimary: values['--color-primary'],
    colorBgContainer: values['--color-white-100'],
    // colorPrimaryHover: '#DCE9FD',
    borderRadius: 2,
    colorIcon: values['--color-black'],
    colorIconHover: values['--color-primary'],

    colorTextPlaceholder: values['--color-black-100'],
    colorText: values['--color-black']
  },
};

