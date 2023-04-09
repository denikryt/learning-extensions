import { translate } from '@vitalets/google-translate-api';

const { text } = await translate('Привет мир', { to: 'en' });

console.log(text);
