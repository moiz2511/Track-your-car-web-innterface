/* eslint-disable import/no-relative-packages */
import React, {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import moment from 'moment';
import 'moment/min/locales.min';

import af from '../../resources/l10n/af.json';
import ar from '../../resources/l10n/ar.json';
import az from '../../resources/l10n/az.json';
import bg from '../../resources/l10n/bg.json';
import bn from '../../resources/l10n/bn.json';
import ca from '../../resources/l10n/ca.json';
import cs from '../../resources/l10n/cs.json';
import da from '../../resources/l10n/da.json';
import de from '../../resources/l10n/de.json';
import el from '../../resources/l10n/el.json';
import en from '../../resources/l10n/en.json';
import es from '../../resources/l10n/es.json';
import fa from '../../resources/l10n/fa.json';
import fi from '../../resources/l10n/fi.json';
import fr from '../../resources/l10n/fr.json';
import he from '../../resources/l10n/he.json';
import hi from '../../resources/l10n/hi.json';
import hr from '../../resources/l10n/hr.json';
import hu from '../../resources/l10n/hu.json';
import id from '../../resources/l10n/id.json';
import it from '../../resources/l10n/it.json';
import ja from '../../resources/l10n/ja.json';
import ka from '../../resources/l10n/ka.json';
import kk from '../../resources/l10n/kk.json';
import km from '../../resources/l10n/km.json';
import ko from '../../resources/l10n/ko.json';
import lo from '../../resources/l10n/lo.json';
import lt from '../../resources/l10n/lt.json';
import lv from '../../resources/l10n/lv.json';
import ml from '../../resources/l10n/ml.json';
import mn from '../../resources/l10n/mn.json';
import ms from '../../resources/l10n/ms.json';
import nb from '../../resources/l10n/nb.json';
import ne from '../../resources/l10n/ne.json';
import nl from '../../resources/l10n/nl.json';
import nn from '../../resources/l10n/nn.json';
import pl from '../../resources/l10n/pl.json';
import pt from '../../resources/l10n/pt.json';
import ptBR from '../../resources/l10n/pt_BR.json';
import ro from '../../resources/l10n/ro.json';
import ru from '../../resources/l10n/ru.json';
import si from '../../resources/l10n/si.json';
import sk from '../../resources/l10n/sk.json';
import sl from '../../resources/l10n/sl.json';
import sq from '../../resources/l10n/sq.json';
import sr from '../../resources/l10n/sr.json';
import sv from '../../resources/l10n/sv.json';
import ta from '../../resources/l10n/ta.json';
import th from '../../resources/l10n/th.json';
import tr from '../../resources/l10n/tr.json';
import uk from '../../resources/l10n/uk.json';
import uz from '../../resources/l10n/uz.json';
import vi from '../../resources/l10n/vi.json';
import zh from '../../resources/l10n/zh.json';
import zhTW from '../../resources/l10n/zh_TW.json';
import usePersistedState from '../util/usePersistedState';

const languages = {
  af: { data: af, name: 'Afrikaans' },
  ar: { data: ar, name: '??????????????' },
  az: { data: az, name: 'Az??rbaycanca' },
  bg: { data: bg, name: '??????????????????' },
  bn: { data: bn, name: '???????????????' },
  ca: { data: ca, name: 'Catal??' },
  cs: { data: cs, name: '??e??tina' },
  de: { data: de, name: 'Deutsch' },
  da: { data: da, name: 'Dansk' },
  el: { data: el, name: '????????????????' },
  en: { data: en, name: 'English' },
  es: { data: es, name: 'Espa??ol' },
  fa: { data: fa, name: '??????????' },
  fi: { data: fi, name: 'Suomi' },
  fr: { data: fr, name: 'Fran??ais' },
  he: { data: he, name: '??????????' },
  hi: { data: hi, name: '??????????????????' },
  hr: { data: hr, name: 'Hrvatski' },
  hu: { data: hu, name: 'Magyar' },
  id: { data: id, name: 'Bahasa Indonesia' },
  it: { data: it, name: 'Italiano' },
  ja: { data: ja, name: '?????????' },
  ka: { data: ka, name: '?????????????????????' },
  kk: { data: kk, name: '??????????????' },
  ko: { data: ko, name: '?????????' },
  km: { data: km, name: '???????????????????????????' },
  lo: { data: lo, name: '?????????' },
  lt: { data: lt, name: 'Lietuvi??' },
  lv: { data: lv, name: 'Latvie??u' },
  ml: { data: ml, name: '??????????????????' },
  mn: { data: mn, name: '???????????? ??????' },
  ms: { data: ms, name: '???????? ??????????' },
  nb: { data: nb, name: 'Norsk bokm??l' },
  ne: { data: ne, name: '??????????????????' },
  nl: { data: nl, name: 'Nederlands' },
  nn: { data: nn, name: 'Norsk nynorsk' },
  pl: { data: pl, name: 'Polski' },
  pt: { data: pt, name: 'Portugu??s' },
  ptBR: { data: ptBR, name: 'Portugu??s (Brasil)' },
  ro: { data: ro, name: 'Rom??n??' },
  ru: { data: ru, name: '??????????????' },
  si: { data: si, name: '???????????????' },
  sk: { data: sk, name: 'Sloven??ina' },
  sl: { data: sl, name: 'Sloven????ina' },
  sq: { data: sq, name: 'Shqip??ria' },
  sr: { data: sr, name: 'Srpski' },
  sv: { data: sv, name: 'Svenska' },
  ta: { data: ta, name: '???????????????' },
  th: { data: th, name: '?????????' },
  tr: { data: tr, name: 'T??rk??e' },
  uk: { data: uk, name: '????????????????????' },
  uz: { data: uz, name: 'O??zbekcha' },
  vi: { data: vi, name: 'Ti???ng Vi???t' },
  zh: { data: zh, name: '??????' },
  zhTW: { data: zhTW, name: '?????? (Taiwan)' },
};

const getDefaultLanguage = () => {
  const browserLanguages = window.navigator.languages ? window.navigator.languages.slice() : [];
  const browserLanguage = window.navigator.userLanguage || window.navigator.language;
  browserLanguages.push(browserLanguage);
  browserLanguages.push(browserLanguage.substring(0, 2));

  for (let i = 0; i < browserLanguages.length; i += 1) {
    let language = browserLanguages[i].replace('-', '');
    if (language in languages) {
      return language;
    }
    if (language.length > 2) {
      language = language.substring(0, 2);
      if (language in languages) {
        return language;
      }
    }
  }
  return 'en';
};

const LocalizationContext = createContext({
  languages,
  language: 'en',
  setLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = usePersistedState('language', getDefaultLanguage());

  const value = useMemo(() => ({ languages, language, setLanguage }), [languages, language, setLanguage]);

  useEffect(() => {
    let selected;
    if (language.length > 2) {
      selected = `${language.slice(0, 2)}-${language.slice(-2).toLowerCase()}`;
    } else {
      selected = language;
    }
    moment.locale([selected, 'en']);
  }, [language]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);

export const useTranslation = () => {
  const context = useContext(LocalizationContext);
  const { data } = context.languages[context.language];
  return useMemo(() => (key) => data[key], [data]);
};

export const useTranslationKeys = (predicate) => {
  const context = useContext(LocalizationContext);
  const { data } = context.languages[context.language];
  return Object.keys(data).filter(predicate);
};
