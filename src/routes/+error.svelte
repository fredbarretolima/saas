<script lang="ts">
	import { page } from '$app/state';
	import { currentTranslations } from '$lib/i18n';
	import { locale } from '$lib/i18n';
	import { locales } from '$lib/i18n/dates';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	const t = $derived($currentTranslations);
	let currentLocale = $state('en');
	
	onMount(() => {
		locale.init();
		const unsub = locale.subscribe((l) => {
			currentLocale = l;
		});
		return unsub;
	});
	
	function changeLocale(event: Event) {
		const target = event.target as HTMLSelectElement;
		locale.set(target.value as keyof typeof locales);
	}
</script>

<svelte:head>
	<title>{t.error.pageNotFound} - SaaS App</title>
</svelte:head>

<div class="error-page">
	<div class="locale-selector">
		<select value={currentLocale} onchange={changeLocale}>
			{#each Object.entries(locales) as [key, lang]}
				<option value={key}>{lang.name}</option>
			{/each}
		</select>
	</div>
	
	<div class="error-content">
		<h1 class="error-code">404</h1>
		<h2 class="error-title">{t.error.pageNotFound}</h2>
		<p class="error-desc">{t.error.pageNotFoundDesc}</p>
		<div class="error-actions">
			<button class="btn btn-primary" onclick={() => goto('/')}>{t.error.goHome}</button>
			<button class="btn btn-secondary" onclick={() => history.back()}>{t.error.goBack}</button>
		</div>
	</div>
</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 20px;
		position: relative;
	}
	
	.locale-selector {
		position: absolute;
		top: 20px;
		right: 20px;
	}
	
	.locale-selector select {
		padding: 8px 12px;
		border: 1px solid rgba(255,255,255,0.3);
		border-radius: 8px;
		background: rgba(255,255,255,0.1);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(10px);
	}
	
	.locale-selector select option {
		color: #333;
		background: #fff;
	}
	
	.error-content {
		text-align: center;
		color: #fff;
	}
	
	.error-code {
		font-size: 150px;
		font-weight: 700;
		margin: 0;
		text-shadow: 0 4px 20px rgba(0,0,0,0.2);
		line-height: 1;
	}
	
	.error-title {
		font-size: 32px;
		font-weight: 600;
		margin: 20px 0;
	}
	
	.error-desc {
		font-size: 18px;
		opacity: 0.9;
		margin-bottom: 40px;
	}
	
	.error-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
	}
	
	.btn {
		padding: 14px 30px;
		border-radius: 30px;
		font-weight: 600;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
	}
	
	.btn-primary {
		background: #fff;
		color: #667eea;
	}
	
	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(0,0,0,0.2);
	}
	
	.btn-secondary {
		background: rgba(255,255,255,0.2);
		color: #fff;
		border: 2px solid #fff;
	}
	
	.btn-secondary:hover {
		background: #fff;
		color: #667eea;
	}
</style>
