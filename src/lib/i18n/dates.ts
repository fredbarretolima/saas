import { format, formatDistanceToNow } from 'date-fns';
import { enUS, es, fr, de, zhCN, ja, ptBR } from 'date-fns/locale';

export const locales = {
	en: { locale: enUS, name: 'English' },
	es: { locale: es, name: 'Español' },
	fr: { locale: fr, name: 'Français' },
	de: { locale: de, name: 'Deutsch' },
	zh: { locale: zhCN, name: '中文' },
	ja: { locale: ja, name: '日本語' },
	pt: { locale: ptBR, name: 'Português (BR)' }
} as const;

export type LocaleKey = keyof typeof locales;

export function formatDate(date: Date | string | number | null | undefined, locale: LocaleKey = 'en'): string {
	if (!date) return '-';
	const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	return format(d, 'PP', { locale: locales[locale].locale });
}

export function formatDateTime(date: Date | string | number | null | undefined, locale: LocaleKey = 'en'): string {
	if (!date) return '-';
	const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	return format(d, 'PPp', { locale: locales[locale].locale });
}

export function formatRelative(date: Date | string | number | null | undefined, locale: LocaleKey = 'en'): string {
	if (!date) return '-';
	const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	return formatDistanceToNow(d, { addSuffix: true, locale: locales[locale].locale });
}
