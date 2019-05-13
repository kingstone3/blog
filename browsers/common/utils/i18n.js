import Vue from 'vue';
import VueI18n from 'vue-i18n';

import config from '<common>/config';

Vue.use(VueI18n)

const messages = {
  zh: require('<common>/locales/zh'),
  en: require('<common>/locales/en'),
}

const i18n = new VueI18n({
  messages,
  locale: config.DEFAULT_LANGUAGE,
});

export const setup = lang => {
  if (!lang) {
    lang = window.localStorage.getItem(config.LOCAL_LANGUAGE_KEY);

    if (!messages[lang]) {
      lang = config.DEFAULT_LANGUAGE;
    }
  }

  window.localStorage.setItem(config.LOCAL_LANGUAGE_KEY, lang);

  Object.keys(messages).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`);
  })
  document.body.classList.add(`lang-${lang}`);
  document.body.setAttribute('lang', lang);

  Vue.config.lang = lang;
  i18n.locale = lang;
}

setup();

export default i18n;
