import { useContext, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { ThemeContext } from '@librechat/client';
import type { ComponentType } from 'react';
import type { TranslationKeys } from '~/hooks';
import { ThemeSelector, LangSelector } from '~/components/Appearance';
<<<<<<< HEAD
=======
import { BetaPill } from '~/components/SidePanel/Agents/Advanced/ui';
>>>>>>> upstream/main
import ToggleSwitch from '../SettingsTabs/ToggleSwitch';
import store from '~/store';

export function toggleControl(opts: {
  stateAtom: Parameters<typeof ToggleSwitch>[0]['stateAtom'];
  localizationKey: TranslationKeys;
  switchId: string;
  hoverCardText?: TranslationKeys;
<<<<<<< HEAD
=======
  beta?: boolean;
  onCheckedChange?: (value: boolean) => void;
>>>>>>> upstream/main
}): ComponentType {
  const Control = () => (
    <ToggleSwitch
      stateAtom={opts.stateAtom}
      localizationKey={opts.localizationKey}
      switchId={opts.switchId}
      hoverCardText={opts.hoverCardText}
<<<<<<< HEAD
=======
      badge={opts.beta === true ? <BetaPill /> : undefined}
      onCheckedChange={opts.onCheckedChange}
>>>>>>> upstream/main
    />
  );
  Control.displayName = `Toggle(${opts.switchId})`;
  return Control;
}

export function ThemeSetting() {
  const { theme, setTheme } = useContext(ThemeContext);
  const onChange = useCallback((value: string) => setTheme(value), [setTheme]);
  return <ThemeSelector theme={theme} onChange={onChange} />;
}

export function LangSetting() {
  const [langcode, setLangcode] = useRecoilState(store.lang);
  const onChange = useCallback(
    (value: string) => {
      const userLang =
        value === 'auto' ? navigator.language || navigator.languages?.[0] || 'en-US' : value;
<<<<<<< HEAD
      requestAnimationFrame(() => {
        document.documentElement.lang = userLang;
      });
=======
>>>>>>> upstream/main
      setLangcode(userLang);
      Cookies.set('lang', userLang, { expires: 365 });
    },
    [setLangcode],
  );
  return <LangSelector langcode={langcode} onChange={onChange} />;
}
