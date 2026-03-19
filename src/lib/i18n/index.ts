import { derived, get } from 'svelte/store';
import { writable } from 'svelte/store';
import type { LocaleKey } from './dates';
import { en, es, ptBR } from './locales';
import type { Translations } from './locales/en';

const translations: Record<LocaleKey, Translations> = {
	en,
	es,
	fr: en,
	de: en,
	zh: en,
	ja: en,
	pt: ptBR
};

export { translations };

export function t(key: string, locale: LocaleKey = 'en'): string {
	const keys = key.split('.');
	let value: unknown = translations[locale] || translations.en;
	
	for (const k of keys) {
		if (value && typeof value === 'object' && k in value) {
			value = (value as Record<string, unknown>)[k];
		} else {
			return key;
		}
	}
	
	return typeof value === 'string' ? value : key;
}

function createI18nStore() {
	const { subscribe, set } = writable<LocaleKey>('en');

	return {
		subscribe,
		set: (locale: LocaleKey) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('locale', locale);
			}
			set(locale);
		},
		init: () => {
			if (typeof localStorage !== 'undefined') {
				const stored = localStorage.getItem('locale') as LocaleKey | null;
				if (stored && stored in translations) {
					set(stored);
				}
			}
		},
		t: (key: string) => {
			const locale = get({ subscribe });
			return t(key, locale);
		}
	};
}

export const locale = createI18nStore();

export const currentTranslations = derived(locale, ($locale) => translations[$locale] || translations.en);
